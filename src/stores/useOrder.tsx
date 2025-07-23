import type { Order } from "@/type/Order.type";
import { create } from "zustand";

type OrderStore = {
  orders: Order[];
  setOrders: (order: Order[]) => void;
  addOrUpdateItem: (menu: Order) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  clearOrders: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getOrdersByMenuId: (menuId: string) => Order[]; // เพิ่มใหม่
};

const useOrder = create<OrderStore>((set, get) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),

  addOrUpdateItem: (menu: Order) => {
    set((state) => {
      const existing = state.orders.find((order) => order.id === menu.id);
      if (existing) {
        const newQuantity = existing.quantity + menu.quantity;
        const newAmount = existing.price * newQuantity;

        return {
          orders: state.orders.map((order) =>
            order.id === menu.id
              ? {
                  ...order,
                  amount: newAmount,
                  quantity: newQuantity,
                  selectedOption: menu.selectedOption,
                  menuId: menu.menuId,
                }
              : order
          ),
        };
      } else {
        // เพิ่ม order ใหม่
        const newOrder: Order = {
          ...menu,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return {
          orders: [...state.orders, newOrder],
        };
      }
    });
  },

  updateQuantity: (id: string, newQuantity: number) => {
    set((state) => {
      if (newQuantity <= 0) {
        return { orders: state.orders.filter((item) => item.id !== id) };
      }
      return {
        orders: state.orders.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: newQuantity,
                amount: item.price * newQuantity,
                updatedAt: new Date().toISOString(),
              }
            : item
        ),
      };
    });
  },

  removeItem: (id: string) => {
    set((state) => {
      const updatedOrders = state.orders.reduce((acc, item) => {
        if (item.id === id) {
          const newQuantity = item.quantity - 1;
          if (newQuantity > 0) {
            acc.push({
              ...item,
              quantity: newQuantity,
              amount: item.price * newQuantity,
              updatedAt: new Date().toISOString(),
            });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as Order[]);

      return { orders: updatedOrders };
    });
  },

  clearOrders: () => {
    set({ orders: [] });
  },

  getTotalItems: () => {
    const state = get();
    return state.orders.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    const state = get();
    return state.orders.reduce((total, item) => total + item.amount, 0);
  },

  // เพิ่มฟังก์ชันเพื่อหา orders ของเมนูเดียวกัน
  getOrdersByMenuId: (menuId: string) => {
    const state = get();
    return state.orders.filter((order) => order.menuId === menuId);
  },
}));

export default useOrder;

export const orderHelpers = {
  getTotalQuantityByMenuId: (orders: Order[], menuId: string): number => {
    return orders
      .filter((order) => order.menuId === menuId)
      .reduce((total, order) => total + order.quantity, 0);
  },

  getTotalAmountByMenuId: (orders: Order[], menuId: string): number => {
    return orders
      .filter((order) => order.menuId === menuId)
      .reduce((total, order) => total + order.amount, 0);
  },

  getUniqueMenuIds: (orders: Order[]): string[] => {
    const menuIds = orders
      .map((order) => order.menuId)
      .filter(Boolean) as string[];
    return [...new Set(menuIds)];
  },

  groupOrdersByMenuId: (orders: Order[]): Record<string, Order[]> => {
    return orders.reduce((groups, order) => {
      const menuId = order.menuId || "unknown";
      if (!groups[menuId]) {
        groups[menuId] = [];
      }
      groups[menuId].push(order);
      return groups;
    }, {} as Record<string, Order[]>);
  },
};
