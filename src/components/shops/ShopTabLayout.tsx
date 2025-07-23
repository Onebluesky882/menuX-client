import { shopAPI } from "@/Api/shop.api";
import { useEffect, useState } from "react";
import { TabsList, TabsTrigger } from "../ui/tabs";

export const ShopTabsLayout = () => {
  const [owner, setOwner] = useState<string | null>(null);

  /* owner see payment of shop */
  useEffect(() => {
    const getOwner = async () => {
      const res = await shopAPI.getOwnerShop();
      if (res.data) {
        setOwner(res.data.ownerId);
      }
    };
    getOwner();
  }, [shopAPI.getOwnerShop]);

  return (
    <TabsList className="flex flex-wrap justify-center  gap-3 mb-6 bg-inherit">
      <TabsTrigger
        value="menu"
        className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
      >
        🍽 Add Menu
      </TabsTrigger>
      <TabsTrigger
        value="shop-menu"
        className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
      >
        ShopMenu
      </TabsTrigger>
      <TabsTrigger
        value="orders"
        className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
      >
        🧾 Orders
      </TabsTrigger>
      <TabsTrigger
        value="staff"
        className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
      >
        👥 Staff
      </TabsTrigger>
      <TabsTrigger
        value="settings"
        className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
      >
        ⚙️ Settings
      </TabsTrigger>{" "}
      {owner && (
        <TabsTrigger
          value="payment"
          className="px-4 py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
        >
          Payment
        </TabsTrigger>
      )}
    </TabsList>
  );
};
