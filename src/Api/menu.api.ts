import axiosInstance from ".";

export const menuApi = {
  create: (data: any) => axiosInstance.post("/menus", data),
  getAll: (shopId: string) => axiosInstance.get(`/menus/?shopId=${shopId}`),
  getByName: (name: string, shopId: string) =>
    axiosInstance.get(
      `/menus/?name=${encodeURIComponent(name)}&shopId=${shopId}`
    ),

  getMenuPreviews: (shopId: string) =>
    axiosInstance.get(`/menus/options/${shopId}`),
  update: (id: string, data: any) => axiosInstance.put(`/menus/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/menus/${id}`),
};

export const menuOptionApi = {
  create: (data: any) => axiosInstance.post("/menu-options", data),
};
