import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ✅ ส่ง cookies ทุก request
});

let isRefreshing = false;

// ✅ Helper function to clear all cookies
const clearAuthCookies = () => {
  const cookiesToClear = ["accessToken", "refreshToken", "authToken"];

  cookiesToClear.forEach(cookieName => {
    // Clear for current domain
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    // Clear for parent domain (if subdomain)
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
    // Clear for root domain
    const rootDomain = window.location.hostname.split(".").slice(-2).join(".");
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${rootDomain}`;
  });
};

// ✅ Comprehensive auth state cleanup
const clearAuthState = async () => {
  // Clear localStorage
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("user");

  // Clear sessionStorage (in case you use it)
  sessionStorage.removeItem("isAuthenticated");
  sessionStorage.removeItem("user");

  // Clear cookies
  clearAuthCookies();

  // Call logout API (don't await to avoid blocking)
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    console.warn("⚠️ Logout API failed, but continuing with cleanup:", error);
  }
};

const isUserLoggedIn = (): boolean => {
  const hasAuthToken = localStorage.getItem("isAuthenticated") === "true";

  const currentPath = window.location.pathname;
  const isOnAuthPage = ["/login", "/register", "/forgot-password"].includes(
    currentPath
  );

  const hasCookies =
    document.cookie.includes("refreshToken") ||
    document.cookie.includes("accessToken");

  return hasAuthToken || hasCookies || !isOnAuthPage;
};

const isProtectedRoute = (url: string): boolean => {
  const protectedPaths = [
    "/auth/me",
    "/auth/refresh",
    "/users",
    "/shops",
    "/orders",
    "/dashboard",
  ];

  return protectedPaths.some(path => url.includes(path));
};

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;
    const requestUrl = originalRequest.url || "";

    // ✅ เช็คเงื่อนไขก่อนทำ refresh
    const shouldTryRefresh =
      isUnauthorized &&
      !originalRequest._retry &&
      !isRefreshing &&
      requestUrl !== "/auth/refresh" && // ป้องกัน infinite loop
      requestUrl !== "/auth/logout" && // ✅ Don't refresh on logout
      isUserLoggedIn() && // ✅ ตรวจว่า user login อยู่หรือไม่
      isProtectedRoute(requestUrl); // ✅ ตรวจว่าเป็น protected route หรือไม่

    if (shouldTryRefresh) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // ✅ ลอง refresh token
        await axiosInstance.post("/auth/refresh");

        // ลอง request เดิมอีกครั้ง
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed:", refreshError);

        // ✅ Complete auth state cleanup
        await clearAuthState();

        // ไปหน้า login เฉพาะเมื่ออยู่ใน protected route
        if (isProtectedRoute(window.location.pathname)) {
          // ✅ Add delay to ensure cleanup completes
          setTimeout(() => {
            window.location.href = "/login";
          }, 100);
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (isUnauthorized && !isProtectedRoute(requestUrl)) {
      return Promise.reject(error);
    }

    // ✅ ถ้าไม่ได้ login และเป็น protected route
    if (isUnauthorized && !isUserLoggedIn() && isProtectedRoute(requestUrl)) {
      await clearAuthState(); // ✅ Clear state before redirect
      setTimeout(() => {
        window.location.href = "/login";
      }, 100);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
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

// ✅ Export logout function for manual use
export const logout = async () => {
  await clearAuthState();

  // Redirect to login after a short delay
  setTimeout(() => {
    window.location.href = "/login";
  }, 100);
};

export default axiosInstance;
