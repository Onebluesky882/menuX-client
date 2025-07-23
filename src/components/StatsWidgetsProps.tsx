import { LayoutDashboard, ChartBar, User } from "lucide-react";

interface StatsWidgetsProps {
  earning: number;
  orders: number;
  customers: number;
}

export const StatsWidgets: React.FC<StatsWidgetsProps> = ({
  earning,
  orders,
  customers,
}) => {
  const stats = [
    {
      title: "Total Earnings",
      value: `$${earning.toLocaleString()}`,
      icon: <LayoutDashboard size={28} className="text-brand" />,
      description: "Since start of period",
    },
    {
      title: "Orders",
      value: orders,
      icon: <ChartBar size={28} className="text-blue-500" />,
      description: "Total orders placed",
    },
    {
      title: "Customers",
      value: customers,
      icon: <User size={28} className="text-green-500" />,
      description: "Unique guests",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 fade-in">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="card-gradient px-6 py-5 rounded-xl flex flex-col gap-2 items-start min-w-[220px] hover:scale-105 transition-transform duration-200"
        >
          <div className="flex items-center gap-3 mb-1">
            {stat.icon}
            <span className="text-lg font-medium text-gray-700">
              {stat.title}
            </span>
          </div>
          <div className="text-3xl font-bold font-playfair text-gray-900">
            {stat.value}
          </div>
          <div className="text-xs text-gray-500">{stat.description}</div>
        </div>
      ))}
    </div>
  );
};
