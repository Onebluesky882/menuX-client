import type { MenuOption } from "./Menu.type";

export type Order = {
  id: string;
  name: string;
  amount: number;
  price: number;
  shopId: string;
  staffId: string;
  quantity: number;
  selectedOption?: MenuOption;
  menuId?: string;
  createdAt?: string;
  updatedAt?: string;
};
