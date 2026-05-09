import { jwtDecode } from "jwt-decode";
import apiService from "../api/apiServices";
import { store } from "../store/store";
import { logout } from "../store/features/auth/authSlice";

export const isTokenExpired = (token: string) => {
  const decoded: any = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

export const refreshToken = async () => {
  const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
  };
  try {
    const response: any = await apiService("/api/auth/token/refresh/", "POST", {
      refresh: getRefreshToken(),
    });
    if (response) {
      localStorage.setItem("accessToken", response?.data?.access);
      localStorage.setItem("refreshToken", response?.data?.refresh);
    }
  } catch (error: any) {
    console.log("error message", error);
    store.dispatch(logout());
  }
};
