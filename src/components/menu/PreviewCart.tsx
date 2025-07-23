import type { Order } from "@/type/Order.type";
import type { Dispatch } from "react";
import { useNavigate } from "react-router-dom";

type CartProps = {
  showCart: boolean;
  setShowCart: Dispatch<React.SetStateAction<boolean>>;
  order: Order[];
  onUpdateQuantity: any;
  onRemoveItem: any;
  totalItems: number;
  totalPrice: number;
};

export const CartPreview = ({
  showCart,
  setShowCart,
  order,
  onUpdateQuantity,
  onRemoveItem,
  totalItems,
  totalPrice,
}: CartProps) => {
  if (!showCart) return null;
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">ตะกร้า ({totalItems})</h2>
          <button
            onClick={() => setShowCart(false)}
            className="text-white hover:bg-white/20 p-2 rounded"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-3">
          {order.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  ฿{item.price} × {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onRemoveItem?.(item.id, item.quantity - 1)}
                  className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <p className="font-bold text-green-600">฿{item.amount}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">ยอดรวม</span>
            <span className="text-xl font-bold text-green-600">
              ฿{totalPrice}
            </span>
          </div>
          <button
            onClick={() => navigate("/payment")}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium"
          >
            สั่งซื้อ
          </button>
        </div>
      </div>
    </div>
  );
};
