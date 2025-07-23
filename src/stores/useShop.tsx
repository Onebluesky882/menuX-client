import { create } from "zustand";

export type Shop = {
  id: string;
  name: string;
  ownerId?: string;
  address?: string;
  updatedAt?: string;
};

type ShopStore = {
  shops: Shop[];
  selectedShop: Shop | null;
  setShops: (shops: Shop[]) => void;
  setSelectedShop: (selected: Shop | null) => void;
};

export const useShopStore = create<ShopStore>((set) => ({
  shops: [],
  selectedShop: null,
  setShops: (shops) => set({ shops }),
  setSelectedShop: (selectedShop) => set({ selectedShop }),

  clearSelectedShop: () => set({ selectedShop: null }),
}));
