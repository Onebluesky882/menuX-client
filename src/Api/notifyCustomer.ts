import axios from "axios";
export const notifyCustomer = async (orderId: string) => {
  try {
    const res = await axios.post(
      "https://localhost:3000/notifications/customer",
      {
        orderId,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Failed to notify customer", error);
  }
};

// await notifyCustomer(orderId);
