import { api } from ".";

export const userApi = {
  getProfile: () => api.get("auth/profile"),
  create: (data: any) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data, { withCredentials: true }),
};
