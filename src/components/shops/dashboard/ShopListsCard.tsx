type Shop = {
  id: string;
  name: string;
  status?: "active" | "inactive" | "pending";
};

type ShopCardProps = {
  shop: Shop;
  navigator: (id: string) => void;
};

export const ShopCard = ({ shop, navigator }: ShopCardProps) => {
  const handleCardClick = () => {
    navigator(shop.id);
  };

  return (
    <div
      className="bg-white  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200"
      onClick={handleCardClick}
    >
      {/* Card Content */}
      <div className="p-4 flex">
        {/* Header with title and status */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate flex-1 mr-2">
            {shop.name}
          </h3>
        </div>
      </div>
    </div>
  );
};
