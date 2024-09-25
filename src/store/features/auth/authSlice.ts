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
      state.user = action.payload;
      state.error = undefined;
    },

    loginFailure(state, action) {
      state.error = action.payload;
    },

    logout(state) {
      localStorage.clear();
      state.isLoggedIn = false;
      state.user = undefined;

      window.location.replace("/signin");
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
