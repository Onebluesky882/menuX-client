import { Route } from "react-router-dom";
import CreateNewShop from "../pages/shop/CreateShop";
import Dashboard from "../pages/Dashboard";
import ShopLayout from "../pages/shop/[shopId]/ShopLayout";
import PublicMenu from "../pages/shop/PublicMenu";
import ShopPaymentForm from "@/pages/shop/[shopId]/ShopPaymentForm";

export const ShopRoute = (
  <>
    <Route path="shops">
      <Route path="create" element={<CreateNewShop />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path=":shopId" element={<ShopLayout />} />
      <Route path=":shopId/payment" element={<ShopPaymentForm />} />
    </Route>
  </>
);
export const MenuRoute = (
  <>
    <Route path="/menu/:shopId" element={<PublicMenu />} />
  </>
);
