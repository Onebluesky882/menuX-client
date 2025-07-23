import api from ".";

export const imagesApi = {
  getImages: (shopId: string, type: string) =>
    api.get("images/menus", { params: { shopId, type } }),
};
