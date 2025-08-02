import { ShopTabsLayout } from "@/components/shops/ShopTabLayout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import useShop from "@/hooks/useShop";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import MenuManagement from "./dashboard/MenuManagement";
import VerifyBankReceive from "./ShopPaymentForm";

type MenuProps = {
  available: boolean;
  name: string;
  price: string;
  image: string[];
  amount: number;
};

const ShopLayout = () => {
  const { selectedShop } = useShop();

  useEffect(() => {}, []);
  return (
    <div>
      <Outlet />
      <div>
        <div>
          <div className="min-h-screen  py-10 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-md md:text-2xl font-bold text-primary  text-center">
                {selectedShop ? `Shop : ${selectedShop.name} ` : "need login!"}
              </h2>

              <div className=" bg-amber-50  rounded-2xl shadow-lg p-6 animate-fade-in">
                {" "}
                <Tabs defaultValue="menu" className="w-full">
                  {" "}
                  <ShopTabsLayout />
                  <AddMenu />
                  <Menus
                    available={false}
                    name={""}
                    price={""}
                    image={[]}
                    amount={0}
                    shopId={selectedShop?.id ?? ""}
                  />
                  <Payment />
                </Tabs>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

const AddMenu = () => {
  return (
    <TabsContent value="menu" className=" ">
      <MenuManagement />
    </TabsContent>
  );
};

const Menus = ({ shopId }: MenuProps & { shopId: string }) => {
  return (
    <TabsContent value="shop-menu">
      <Link to={`/menu/${shopId}`}>
        <u>live menu</u>
      </Link>
    </TabsContent>
  );
};
const Payment = () => {
  return (
    <TabsContent value="payment">
      <VerifyBankReceive />
    </TabsContent>
  );
};

export default ShopLayout;
