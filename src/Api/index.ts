import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ✅ ส่ง cookies ทุก request
});

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;

    if (
      isUnauthorized &&
      !originalRequest._retry &&
      !isRefreshing &&
      originalRequest.url !== "/auth/refresh" // ป้องกัน infinite loop
    ) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // ✅ ใช้ endpoint ที่ถูกต้อง
        await axiosInstance.post("/auth/refresh");
        console.log("✅ Token refreshed successfully");

        // ลอง request เดิมอีกครั้ง
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed:", refreshError);

        // ✅ ไม่ต้องลบ cookies เพราะเป็น httpOnly
        // Backend จะจัดการเอง หรือเรียก logout API
        try {
          await axiosInstance.post("/auth/logout");
        } catch {
          // ถ้า logout ไม่ได้ ไม่เป็นไร
        }

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

// ✅ เพิ่ม request interceptor สำหรับ debug (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
