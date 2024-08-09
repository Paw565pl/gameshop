"use client";

import apiService from "./apiService";

const authService = apiService;

authService.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access-token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

authService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh-token");

      if (!refreshToken) return Promise.reject(error);

      const {
        data: { access: newAccessToken },
      } = await authService.post("/auth/jwt/refresh/", {
        refresh: refreshToken,
      });

      localStorage.setItem("access-token", newAccessToken);
      authService.defaults.headers.common["Authorization"] =
        "Bearer " + newAccessToken;

      return authService(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default authService;
