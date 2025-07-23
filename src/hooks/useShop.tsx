import { shopAPI } from "@/Api/shop.api";
import type { NewShopFormField } from "@/schema/newShopForm";
import { useShopStore } from "@/stores/useShop";
import type { AxiosError } from "axios";
import { toast } from "sonner";

const useShop = () => {
  const { setShops, setSelectedShop } = useShopStore();

  const createShop = async (data: NewShopFormField) => {
    try {
      const response = await shopAPI.create(data);
      if (response.data) {
        toast.success("✅ Shop created successfully!");
        return response.data;
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message ?? "An unknown error occurred.";

      toast.error(`❌ Failed to create shop: ${errorMessage}`);
      return null;
    }
  };

  const setAllShops = async () => {
    const res = await shopAPI.getAll();
    const shops = res.data.data;
    setShops(shops);
  };

  const setShopById = async (param: string) => {
    try {
      const res = await shopAPI.getById(param);
      const shop = res.data.data;
      setSelectedShop(shop);
      return shop;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(`❌ Failed to fetch shop: ${error.message}`);
      return null;
    }
  };

  const shops = useShopStore((state) => state.shops);
  const selectedShop = useShopStore((state) => state.selectedShop);

  return {
    setAllShops,
    setShopById,
    createShop,
    shops,
    selectedShop,
  };
};
export default useShop;
