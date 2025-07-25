import type { ReceiveBank } from "@/type/qrcode.type";
import axiosInstance from ".";
export const shopAPI = {
  create: (data: any) => axiosInstance.post("/shops", data),
  getAll: () => axiosInstance.get("/shops"),
  getById: (id: string) => axiosInstance.get(`/shops/${id}`),
  update: (id: string, data: any) => axiosInstance.put(`/shops/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/shops/${id}`),
  getOwnerShop: () => axiosInstance.get("/shops/getOwnerShop"),
  patchShopReceiveBank: (shopId: string, data: ReceiveBank) =>
    axiosInstance.patch(`/shops/${shopId}`, data),
};
