import useMenu from "@/hooks/useMenu";
import useShop from "@/hooks/useShop";
import useOrder from "@/stores/useOrder";
import type { Menu, SelectedOptionWithQuantity } from "@/type/Menu.type";
import type { Order } from "@/type/Order.type";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "@/components/menu/MenuCard";

const PublicMenu = () => {
  const [loading, setLoading] = useState(false);
  const { shopId } = useParams<{ shopId: string }>();

  const [preload, setPreload] = useState(false);
  const { orders, addOrUpdateItem, getTotalPrice } = useOrder();
  const { selectedShop, setShopById } = useShop();
  const { getAllMenu, getMenusWithShopId, menuPreview } = useMenu();

  const getTotalAmountByMenuId = (menuId: string): number => {
    return orders
      .filter((order) => order.menuId === menuId)
      .reduce((total, order) => total + order.quantity, 0);
  };

  const menuWithImage: Menu[] = useMemo(() => {
    return (menuPreview ?? []).map((menu: any) => {
      const totalAmount = getTotalAmountByMenuId(menu.id);

      return {
        id: menu.id,
        name: menu.name,
        available: menu.available ?? true,
        images: menu.images?.map((img: any) => img.imageUrl) ?? [],
        menuOptions: menu.menuOptions ?? [],
        amount: totalAmount,
        price: menu.price,
      };
    });
  }, [menuPreview, orders]);

  const handleOrder = (
    itemId: string,
    selectedOptions: SelectedOptionWithQuantity[]
  ) => {
    const selectedMenu = menuWithImage.find((menu) => menu.id === itemId);
    if (!selectedMenu) return;

    selectedOptions.forEach((optionWithQty) => {
      const { option, quantity } = optionWithQty;

      const orderItemId = `${itemId}-${option.id}`;

      const orderInput: Order = {
        id: orderItemId,
        name: `${selectedMenu.name} (${option.label})`,
        amount: Number(option.price) * quantity,
        price: Number(option.price),
        quantity: quantity,
        shopId: shopId!,
        staffId: "",
        selectedOption: option,
        menuId: itemId,
      };

      addOrUpdateItem(orderInput);
    });
  };

  const totalItems = useMemo(() => {
    return orders.reduce((total, item) => total + item.quantity, 0);
  }, [orders]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setPreload(true);
      if (!shopId) return;

      try {
        await setShopById(shopId ?? "");
        await getAllMenu(shopId!);
        await getMenusWithShopId(shopId as string);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
        setPreload(false);
      }
    };

    fetchData();
  }, [shopId]);

  useEffect(() => {
    console.log("Total items updated:", totalItems);
  }, [totalItems]);

  orders.forEach((order, index) => {
    console.log(
      `Order ${index + 1}: ${order.name} - Price: ฿${order.price} × Qty: ${
        order.quantity
      } = ฿${order.amount}`
    );
  });

  return (
    <>
      {preload ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg text-gray-600">กำลังโหลด...</div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r rounded-2xl from-orange-500 via-pink-500 to-purple-600 shadow-2xl sticky top-0 z-20">
            <div className="max-w-6xl mt-2 mb-5 mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                    {selectedShop?.name}
                  </h1>
                  <p className="text-white/90 text-sm">
                    {selectedShop?.address}
                  </p>
                </div>

                {/* Total Items Badge */}
                {totalItems > 0 && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-white font-semibold">
                      ตะกร้า: {totalItems} รายการ
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-lg text-gray-600">กำลังโหลดเมนู...</div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto px-4 pb-32 pt-8">
              {menuWithImage && menuWithImage.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {menuWithImage.map((menu) => (
                    <ItemCard
                      key={menu.id}
                      onAmountChange={(itemId, selectedOptions) => {
                        handleOrder(itemId, selectedOptions);
                      }}
                      item={menu}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-gray-500 text-lg">ไม่มีเมนูในขณะนี้</div>
                </div>
              )}
            </div>
          )}

          {/* Total Price Summary - Fixed Bottom */}
          {totalItems > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-30">
              <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">
                      {totalItems} รายการ
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      ฿{getTotalPrice().toLocaleString()}
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200">
                    ดูตะกร้า
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PublicMenu;
