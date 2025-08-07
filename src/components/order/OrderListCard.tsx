import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Order } from "../../type/Order.type";

interface OrderListProps {
  orders: Order[];
}

export const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className="space-y-6">
      {orders.map(order => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Order ID: {order.id}</CardTitle>
              <Badge variant="outline" className="capitalize">
                {order.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">
              Total Quantity: {order.quantity} | Total Price: ฿
              {order.totalPrice}
            </p>
            <p className="text-xs text-gray-400">
              Created: {new Date(order.createdAt).toLocaleString()}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.orderItems.map(item => (
              <div key={item.id} className="border-b pb-2">
                <div className="flex justify-between text-sm">
                  <div>
                    🍽 {item.menu.name} ({item.menuOption.label}) ×{" "}
                    {item.quantity}
                  </div>
                  <div className="font-medium">฿{item.totalPrice}</div>
                </div>
                <div className="text-xs text-gray-500">
                  Status: {item.status} | Option Price: ฿{item.menuOption.price}{" "}
                  | Each: ฿{item.priceEach}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
