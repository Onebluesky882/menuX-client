import { menuApi } from "@/Api/menu.api";
import { useState } from "react";

type Menu = {
  id: string;
  available: boolean;
  name: string;
  price: string;
  shopId: string;
};

type Options = {
  label: string;
  price: string;
};

type Images = {
  id: string;
  url: string;
};

type MenuPreview = {
  id: string;
  name: string;
  option: Options[];
  images: Images[];
  available?: boolean | undefined;
  menuId?: string | null | undefined;
};

const useMenu = () => {
  const [menus, setMenus] = useState<Menu[] | null>(null);
  const [menuPreview, setMenuPreview] = useState<MenuPreview[] | null>(null);

  const getAllMenu = async (shopId: string) => {
    const res = await menuApi.getAll(shopId);
    if (res.data) {
      setMenus(res.data.data);
    }
  };

  const getMenusPreview = async (shopId: string) => {
    const res = await menuApi.getMenuPreviews(shopId);
    if (res.data) {
      const data = res.data;
      setMenuPreview(data);
    }
  };

  return {
    getAllMenu,
    menus,
    getMenusWithShopId: getMenusPreview,
    menuPreview,
  };
};

export default useMenu;
