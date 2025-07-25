import { axiosInstance } from ".";

export const userApi = {
  getProfile: () => axiosInstance.get("auth/profile"),
  create: (data: any) => axiosInstance.post("/auth/register", data),
  logout: () => axiosInstance.post("/auth/logout"),
  login: (data: { email: string; password: string }) =>
    axiosInstance.post("/auth/login", data, { withCredentials: true }),
};
