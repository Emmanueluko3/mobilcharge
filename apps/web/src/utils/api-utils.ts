import { jwtDecode } from "jwt-decode";
import { apolloClient } from "../api/apolloClient";
import { gql } from "@apollo/client";
import { store } from "../store/store";
import { logout } from "../store/features/auth/authSlice";

export const isTokenExpired = (token: string) => {
  const decoded: any = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refresh: String!) {
    refreshToken(refresh: $refresh) {
      access
      refresh
    }
  }
`;

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  try {
    const { data } = await apolloClient.mutate<any>({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: { refresh },
    });
    if (data?.refreshToken) {
      localStorage.setItem("accessToken", data.refreshToken.access);
      localStorage.setItem("refreshToken", data.refreshToken.refresh);
    }
  } catch (error: any) {
    console.log("error message", error);
    store.dispatch(logout());
  }
};
