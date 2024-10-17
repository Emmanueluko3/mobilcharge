import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../../api/apiServices";

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
      const response: any = await apiService("api/auth/get-user-info/", "GET");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
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
