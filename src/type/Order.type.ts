export type MenuOption = {
  label: string;
  price: string;
};

export type Menu = {
  name: string;
  price: string;
};

export type OrderItem = {
  id: string;
  quantity: string;
  priceEach: string;
  totalPrice: string;
  status: string;
  menu: Menu;
  menuOption: MenuOption;
};

export type Order = {
  id: string;
  status: string;
  quantity: string;
  totalPrice: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
};
