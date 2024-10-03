import { createSlice } from "@reduxjs/toolkit";

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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
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
      state.isLoggedIn = false;
      state.user = undefined;

      window.location.replace("/login");
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
