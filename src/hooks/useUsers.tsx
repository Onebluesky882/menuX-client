import { useUserStore } from "@/stores/useUser";
import { useEffect } from "react";
import { userApi } from "../Api/user.api";

const useUsers = () => {
  const setUser = useUserStore(state => state.setUser); // ✅ Get setUser from store properly
  const fetchProfile = useUserStore(state => state.fetchProfile);
  const profile = useUserStore(state => state.user);

  useEffect(() => {
    fetchProfile();
  }, []);

  const register = async ({
    email,
    username,
    password,
  }: {
    email: string;
    username: string;
    password: string;
  }) => {
    const res = await userApi.create({ email, username, password });
    try {
      console.log(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await userApi.login({ email, password });
    try {
      if (response.data.success) {
        console.log(response.data);
        return response.data;
      } else {
        return { success: false, message: "Unexpected error occurred" };
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // ✅ Comprehensive logout function
  const logoutUser = async () => {
    try {
      console.log("🚪 Starting logout process from useUsers...");

      // ✅ Clear user state immediately for better UX
      setUser(null);

      // ✅ Call logout API (with timeout to prevent hanging)
      const logoutPromise = userApi.logout();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Logout timeout")), 5000)
      );

      await Promise.race([logoutPromise, timeoutPromise]);
      console.log("✅ Logout API called successfully");
    } catch (error) {
      console.warn("⚠️ Logout API failed, but continuing with cleanup:", error);
      // Even if API fails, we should still clear local state
    } finally {
      // ✅ Always clear all local storage items (regardless of API success/failure)
      const keysToRemove = [
        "auth_token",
        "isAuthenticated",
        "user",
        "accessToken",
        "refreshToken",
      ];

      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });

      // ✅ Clear sessionStorage as well
      keysToRemove.forEach(key => {
        sessionStorage.removeItem(key);
      });

      // ✅ Clear authentication cookies
      const cookiesToClear = [
        "accessToken",
        "refreshToken",
        "authToken",
        "auth_token",
      ];
      cookiesToClear.forEach(cookieName => {
        // Clear for current domain
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        // Clear for parent domain (if subdomain)
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
        // Clear for root domain
        const rootDomain = window.location.hostname
          .split(".")
          .slice(-2)
          .join(".");
        if (rootDomain !== window.location.hostname) {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${rootDomain}`;
        }
      });

      // ✅ Ensure user state is cleared (in case it wasn't cleared above)
      setUser(null);

      // ✅ Broadcast logout to other tabs
      const channel = new BroadcastChannel("user-session");
      channel.postMessage({ type: "SET_USER", user: null });
      channel.postMessage({ type: "LOGOUT" }); // Additional logout message

      // ✅ Dispatch custom event for any components listening
      window.dispatchEvent(new CustomEvent("user-logout"));

      console.log("✅ Logout cleanup completed");
    }
  };

  return { logoutUser, profile, login, fetchProfile, register };
};

export default useUsers;
