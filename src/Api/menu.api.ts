import { api } from ".";

export const menuApi = {
  create: (data: any) => api.post("/menus", data),
  getAll: (shopId: string) => api.get(`/menus/?shopId=${shopId}`),
  getByName: (name: string, shopId: string) =>
    api.get(`/menus/?name=${encodeURIComponent(name)}&shopId=${shopId}`),

  getMenuPreviews: (shopId: string) => api.get(`/menus/options/${shopId}`),
  update: (id: string, data: any) => api.put(`/menus/${id}`, data),
  delete: (id: string) => api.delete(`/menus/${id}`),
};

export const menuOptionApi = {
  create: (data: any) => api.post("/menu-options", data),
};
