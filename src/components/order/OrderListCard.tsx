import type { OrderItem } from "../../type/Order.type";

type GroupedData = Record<
  string, // menuName
  {
    menuName: string;
    totalQuantity: number;
    totalPrice: number;
    options: Record<
      string, // optionLabel
      {
        label: string;
        totalQuantity: number;
        totalPrice: number;
        orderItems: OrderItem[];
      }
    >;
  }
>;

function groupByMenuAndOption(allOrderItems: OrderItem[]): GroupedData {
  const grouped: GroupedData = {};

  allOrderItems.forEach(item => {
    const menuName = item.menu.name;
    const optionLabel = item.menuOption.label;

    if (!grouped[menuName]) {
      grouped[menuName] = {
        menuName,
        totalQuantity: 0,
        totalPrice: 0,
        options: {},
      };
    }

    const menuGroup = grouped[menuName];
    menuGroup.totalQuantity += Number(item.quantity);
    menuGroup.totalPrice += Number(item.totalPrice);

    if (!menuGroup.options[optionLabel]) {
      menuGroup.options[optionLabel] = {
        label: optionLabel,
        totalQuantity: 0,
        totalPrice: 0,
        orderItems: [],
      };
    }

    const optionGroup = menuGroup.options[optionLabel];
    optionGroup.totalQuantity += Number(item.quantity);
    optionGroup.totalPrice += Number(item.totalPrice);
    optionGroup.orderItems.push(item);
  });

  return grouped;
}

type Props = {
  allOrderItems: OrderItem[];
};
const OrderListCard = ({ allOrderItems }: Props) => {
  const grouped = groupByMenuAndOption(allOrderItems);
  return (
    <div className="space-y-8">
      {Object.entries(grouped)
        .sort(([aName], [bName]) => aName.localeCompare(bName))
        .map(([menuName, menuGroup]) => (
          <div key={menuName} className="border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">🍽 {menuGroup.menuName}</h2>
            <p>Total Quantity: {menuGroup.totalQuantity}</p>
            <p>Total Price: ฿{menuGroup.totalPrice.toFixed(2)}</p>

            <div className="mt-4 pl-4 space-y-4">
              {Object.entries(menuGroup.options)
                .sort(([aLabel], [bLabel]) => aLabel.localeCompare(bLabel))
                .map(([optionLabel, optionGroup]) => (
                  <div key={optionLabel}>
                    <h3 className="font-semibold text-lg">
                      {optionGroup.label}
                    </h3>
                    <p>Quantity: {optionGroup.totalQuantity}</p>
                    <p>Price: ฿{optionGroup.totalPrice.toFixed(2)}</p>

                    <div className="mt-2 space-y-2">
                      {optionGroup.orderItems.map(item => (
                        <OrderItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};
export default OrderListCard;
const OrderItemCard = ({ item }: { item: OrderItem }) => (
  <div className="border p-2 bg-white shadow rounded-md">
    <div className="flex justify-between text-sm">
      <div>
        {item.menu.name} ({item.menuOption.label}) × {item.quantity}
      </div>
      <div className="font-medium">฿{item.totalPrice}</div>
    </div>
    <div className="text-xs text-gray-500">
      Status: {item.status} | Option Price: ฿{item.menuOption.price} | Each: ฿
      {item.priceEach}
    </div>
  </div>
);
