import QuickActionOpenShop, {
  FeatureGrid,
} from "@/components/shops/newShop/QuickOpenShop";
import { useEffect } from "react";
import useShop from "@/hooks/useShop";
import { ShopCard } from "@/components/shops/dashboard/ShopListsCard";
const Dashboard = () => {
  const { setAllShops, shops } = useShop();
  useEffect(() => {
    setAllShops();
  }, []);

  const handleShopId = async (id: string) => {
    const shop = shops.find((shop) => shop.id === id);
    if (!shop) return;

    window.location.pathname = `/shops/${shop.id}`;
  };
  console.log("shops ,", shops.length);
  return (
    <>
      {!Array.isArray(shops) ? (
        <div>
          <QuickActionOpenShop />
          <FeatureGrid />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen  ">
          <div className="container flex flex-col flex-1 py-8 max-w-4xl mx-auto w-full">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-6">
              Dashboard
            </h1>

            {/* Analytics Section */}
            <section className=" bg-white/80 flex rounded-2xl shadow-md p-6 animate-fade-in">
              <div className="flex  w-full flex-col md:flex-row md:items-baseline  gap-8 ">
                <div className="md:mt-2">
                  <QuickActionOpenShop />
                </div>

                <div className="w-[70%]">
                  <h2 className="text-xl text-center md:text-2xl font-semibold font-playfair ">
                    {shops.length > 0 && "ร้านอาหารของคุณ"}
                  </h2>

                  <div className="flex">
                    {shops.map((shop) => (
                      <ShopCard
                        key={shop.id}
                        shop={{
                          id: shop.id,
                          name: shop.name,
                        }}
                        navigator={() => handleShopId(shop.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <div className="flex-grow" />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
