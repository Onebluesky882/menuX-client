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
    <div className="  mx-30">
      <TabsList className=" flex flex-wrap justify-center  gap-3 mb-6 bg-inherit   w-full  ">
        <TabsTrigger
          value="menu"
          className=" py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
        >
          🍽 Add Menu
        </TabsTrigger>
        <TabsTrigger
          value="shop-menu"
          className="py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
        >
          ShopMenu
        </TabsTrigger>
        <TabsTrigger
          value="orders"
          className=" py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
        >
          🧾 Orders
        </TabsTrigger>

        {owner && (
          <TabsTrigger
            value="payment"
            className=" py-2 rounded-full bg-white shadow border border-gray-300 text-gray-700 hover:bg-purple-100 transition-all duration-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Payment
          </TabsTrigger>
        )}
      </TabsList>
    </div>
  );
};
