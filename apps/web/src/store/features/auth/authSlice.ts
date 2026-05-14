import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apolloClient } from "../../../api/apolloClient";
import { GET_USER_INFO } from "../../../api/queries";

interface AuthState {
  isLoggedIn: boolean;
  user?: object | undefined;
  error?: any;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
  error: undefined,
};

export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query<any>({
        query: GET_USER_INFO,
        fetchPolicy: "network-only"
      });
      return data.me;
    } catch (error: any) {
      if (error.graphQLErrors?.length > 0) {
        return rejectWithValue({ error: error.graphQLErrors[0].message });
      }
      return rejectWithValue({ error: error.message });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      localStorage.setItem(
        "role",
        action?.payload?.user?.is_superuser ? "admin" : "user"
      );
      state.isLoggedIn = true;
      localStorage.setItem("accessToken", action.payload.access);
      localStorage.setItem("refreshToken", action.payload.refresh);

      state.user = action.payload.user;
      state.error = undefined;
    },

    loginFailure(state, action) {
      state.error = action.payload;
    },

    logout(state) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      localStorage.removeItem("persist:root");
      state.isLoggedIn = false;
      state.user = undefined;
      window.location.replace("/login");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = undefined;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
