import { api } from ".";

export const shopAPI = {
  create: (data: any) => api.post("/shops", data),
  getAll: () => api.get("/shops"),
  getById: (id: string) => api.get(`/shops/${id}`),
  update: (id: string, data: any) => api.put(`/shops/${id}`, data),
  delete: (id: string) => api.delete(`/shops/${id}`),
  getOwnerShop: () => api.get("/shops/getOwnerShop"),
};
