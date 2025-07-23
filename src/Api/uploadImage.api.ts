import { api } from ".";

export const uploadImageApi = {
  create: (data: any) => api.post("/r2", data),
  getAll: (shopId: string) => api.get(`/r2/?shopId=${shopId}`),
  getById: (id: string) => api.get(`/r2/${id}`),
  update: (id: string, data: any) => api.put(`/r2/${id}`, data),
  delete: (id: string) => api.delete(`/r2/${id}`),
};
