import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  // baseURL: "https://menux-production-7266.up.railway.app/",
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const hasRefreshToken = !!Cookies.get("refreshToken");
    const isUnauthorized = error.response?.status === 401;

    if (
      isUnauthorized &&
      !originalRequest._retry &&
      !isRefreshing &&
      hasRefreshToken
    ) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post("/auth/refresh");

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // ล้าง token
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        // ไปหน้า login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
