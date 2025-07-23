export type Menu = {
  id: string;
  price: number;
  available: boolean;
  name: string;
  images: string[];
  amount: number;
  description?: string;
  category?: string;
  rating?: number;
  prepTime?: string;
  isSpicy?: boolean;
  isPopular?: boolean;
  discount?: number;
  menuOptions: MenuOption[];
};

export type MenuOption = {
  id: string;
  label: string;
  price: string;
  available: boolean;
};

export type SelectedOptionWithQuantity = {
  option: MenuOption;
  quantity: number;
};
