import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ✅ ส่ง cookies ทุก request
});

let isRefreshing = false;

// ✅ Function to check if user is logged in
const isUserLoggedIn = (): boolean => {
  // ตรวจสอบว่ามี auth state หรือไม่
  // วิธีที่ 1: ตรวจจาก localStorage/sessionStorage
  const hasAuthToken = localStorage.getItem("isAuthenticated") === "true";

  // วิธีที่ 2: ตรวจจาก current path
  const currentPath = window.location.pathname;
  const isOnAuthPage = ["/login", "/register", "/forgot-password"].includes(
    currentPath
  );

  // วิธีที่ 3: ตรวจจาก cookie existence (ถ้าเป็น httpOnly cookie)
  const hasCookies =
    document.cookie.includes("refreshToken") ||
    document.cookie.includes("accessToken");

  return hasAuthToken || hasCookies || !isOnAuthPage;
};

// ✅ Function to check if this is a protected route
const isProtectedRoute = (url: string): boolean => {
  const protectedPaths = [
    "/auth/me",
    "/auth/refresh",
    "/users",
    "/shops",
    "/orders",
    "/dashboard",
  ];

  return protectedPaths.some((path) => url.includes(path));
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;
    const requestUrl = originalRequest.url || "";

    // ✅ เช็คเงื่อนไขก่อนทำ refresh
    const shouldTryRefresh =
      isUnauthorized &&
      !originalRequest._retry &&
      !isRefreshing &&
      requestUrl !== "/auth/refresh" && // ป้องกัน infinite loop
      isUserLoggedIn() && // ✅ ตรวจว่า user login อยู่หรือไม่
      isProtectedRoute(requestUrl); // ✅ ตรวจว่าเป็น protected route หรือไม่

    if (shouldTryRefresh) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // ✅ ลอง refresh token
        await axiosInstance.post("/auth/refresh");
        console.log("✅ Token refreshed successfully");

        // ลอง request เดิมอีกครั้ง
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed:", refreshError);

        // ✅ Clear auth state
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");

        // ลอง logout API
        try {
          await axiosInstance.post("/auth/logout");
        } catch {
          // ถ้า logout ไม่ได้ ไม่เป็นไร
        }

        // ไปหน้า login เฉพาะเมื่ออยู่ใน protected route
        if (isProtectedRoute(window.location.pathname)) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ✅ ถ้าเป็น 401 ใน public route ให้ผ่านไปเลย
    if (isUnauthorized && !isProtectedRoute(requestUrl)) {
      console.log(`ℹ️ 401 on public route: ${requestUrl} - ignoring`);
      return Promise.reject(error);
    }

    // ✅ ถ้าไม่ได้ login และเป็น protected route
    if (isUnauthorized && !isUserLoggedIn() && isProtectedRoute(requestUrl)) {
      console.log("⚠️ Accessing protected route without login - redirecting");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// ✅ Request interceptor สำหรับ debug
axiosInstance.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      const authStatus = isUserLoggedIn() ? "🟢 Logged In" : "🔴 Not Logged In";
      console.log(
        `📤 ${config.method?.toUpperCase()} ${config.url} | ${authStatus}`
      );
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Helper functions to manage auth state
export const setAuthState = (isAuthenticated: boolean, user?: any) => {
  if (isAuthenticated) {
    localStorage.setItem("isAuthenticated", "true");
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  } else {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  }
};

export const getAuthState = () => {
  return {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    user: JSON.parse(localStorage.getItem("user") || "null"),
  };
};

export default axiosInstance;
