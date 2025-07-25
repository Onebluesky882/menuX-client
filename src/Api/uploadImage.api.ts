import axiosInstance from ".";

export const uploadImageApi = {
  create: (data: any) => axiosInstance.post("/r2", data),
  getAll: (shopId: string) => axiosInstance.get(`/r2/?shopId=${shopId}`),
  getById: (id: string) => axiosInstance.get(`/r2/${id}`),
  update: (id: string, data: any) => axiosInstance.put(`/r2/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/r2/${id}`),
};
