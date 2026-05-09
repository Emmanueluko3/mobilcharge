import axios from "axios";
import { isTokenExpired, refreshToken } from "../utils/api-utils";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const globalAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
    "Content-Type": "application/json",
  },
});

globalAxios.interceptors.request.use(async (config) => {
  if (
    config?.url?.includes("/api/auth/token/refresh/") ||
    config?.url?.includes("/api/auth/logout/")
  ) {
    return config;
  }
  let accessToken = getAccessToken();

  if (accessToken) {
    if (isTokenExpired(accessToken)) {
      await refreshToken();
    }
    accessToken = getAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

globalAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
