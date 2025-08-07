import axiosInstance from ".";

export const orderApi = {
  getAllPurchase: (shopId: string) =>
    axiosInstance.get(`/orders/purchases/${shopId}`),
  getOrderPurchase: (orderId: string) =>
    axiosInstance.get(`orders/purchase/${orderId}`),
  updateOrderPurchase: (orderId: string) =>
    axiosInstance.patch(`/orders/${orderId}`),

  // updateOrderItem.patch(`/orders/${orderId}`)
};
