import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useMenuOptions } from "@/hooks/useMenuOptions";
import type { MenuOption, SelectedOptionWithQuantity } from "@/type/Menu.type";

export type ItemCardProps = {
  id: string;
  name: string;
  price?: number;
  amount: number;
  available: boolean;
  images: string[];
  menuOptions: MenuOption[];
  prepTime?: string;
};

export type ItemCardComponentProps = {
  item: ItemCardProps;
  onAmountChange?: (
    itemId: string,
    selectedOptions: SelectedOptionWithQuantity[]
  ) => void;
};

export default function ItemCard({
  item,
  onAmountChange,
}: ItemCardComponentProps) {
  const { id, name, available, images, menuOptions, prepTime } = item;
  const {
    selectedOptions,
    handleOptionSelect,
    handleDecrement,
    handleIncrement,
    handleRemoveOption,
    getTotalPrice,
    getTotalItems,
    resetOptions,
  } = useMenuOptions();

  const isSoldOut = !available;

  const handleAddToCart = () => {
    if (selectedOptions.length > 0) {
      onAmountChange?.(id, selectedOptions);
      resetOptions(); // Reset after adding to cart
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -2 }}
      className="w-full"
    >
      <Card
        className={clsx(
          "group relative rounded-3xl overflow-hidden transition-all duration-300",
          "bg-gradient-to-br from-white to-gray-50/50",
          "border-0 shadow-lg hover:shadow-2xl hover:shadow-gray-200/40",
          "backdrop-blur-sm",
          isSoldOut && "opacity-60 grayscale"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-gray-100/30 pointer-events-none" />

        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={images[0]}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                สินค้าหมด
              </span>
            </div>
          )}
        </div>

        <CardContent className="relative p-4 md:p-6 space-y-4">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg md:text-xl text-gray-900 line-clamp-1 tracking-tight">
              {name}
            </h3>

            {/* Option Selection - Touch/Click Cards */}
            {menuOptions && menuOptions.length > 0 && (
              <div className="space-y-3">
                <span className="text-sm font-medium text-gray-700">
                  เลือกตัวเลือก:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {menuOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleOptionSelect(option)}
                      disabled={!option.available || isSoldOut}
                      whileTap={{ scale: 0.95 }}
                      className={clsx(
                        "p-3 rounded-xl border-2 transition-all duration-200",
                        "flex flex-col items-center gap-1",
                        "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                      <span className="text-xs font-semibold text-green-600">
                        ฿{option.price}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Options Preview */}
            {selectedOptions.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-sm font-medium text-gray-700">
                  รายการที่เลือก:
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedOptions.map((item) => (
                    <div
                      key={item.option.id}
                      className="flex items-center justify-between p-2 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-blue-900">
                          {item.option.label}
                        </span>
                        <span className="text-xs text-blue-700">
                          ฿{item.option.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecrement(item.option.id);
                            }}
                            className="w-6 h-6 bg-blue-200 hover:bg-blue-300 rounded-full flex items-center justify-center"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-semibold text-blue-900 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIncrement(item.option.id);
                            }}
                            className="w-6 h-6 bg-blue-200 hover:bg-blue-300 rounded-full flex items-center justify-center"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveOption(item.option.id);
                          }}
                          className="w-6 h-6 bg-red-200 hover:bg-red-300 rounded-full flex items-center justify-center"
                        >
                          <X size={12} />
                        </button>

                        <div className="text-sm font-bold text-green-600 min-w-[40px] text-right">
                          ฿
                          {(
                            Number(item.option.price) * item.quantity
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Summary */}
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="font-semibold text-green-900">
                    รวมทั้งหมด:
                  </span>
                  <div className="text-right">
                    <div className="text-sm text-green-700">
                      {getTotalItems()} รายการ
                    </div>
                    <div className="text-lg font-bold text-green-800">
                      ฿{getTotalPrice().toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="flex items-center justify-center">
            <Button
              onClick={handleAddToCart}
              disabled={isSoldOut || selectedOptions.length === 0}
              className={clsx(
                "px-8 py-3 rounded-2xl transition-all duration-200",
                "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
                "text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-green-200/50",
                "hover:scale-105 active:scale-95",
                "disabled:opacity-40 disabled:hover:scale-100"
              )}
            >
              {selectedOptions.length === 0
                ? "เลือกตัวเลือกก่อน"
                : `เพิ่มลงตะกร้า (${getTotalItems()} รายการ)`}
            </Button>
          </div>

          {prepTime && (
            <div className="flex items-center justify-center pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                <span className="text-blue-600">⏱️</span>
                <span className="text-xs md:text-sm font-medium text-blue-700">
                  {prepTime}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
