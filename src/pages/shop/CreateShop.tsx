import RestaurantForm from "@/components/shops/newShop/RestaurantForm/RestaurantForm";
import useShop from "@/hooks/useShop";
import { newShopSchema, type NewShopFormField } from "@/schema/newShopForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateShop = () => {
  const { createShop } = useShop();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<NewShopFormField>({
    resolver: zodResolver(newShopSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<NewShopFormField> = async (data) => {
    const newShop = await createShop(data);

    if (newShop.data.length > 0) {
      reset();

      const shopId = newShop.data[0];

      navigate(`/shops/${shopId.id}`);
    }
  };
  /*   
  bankCode: text('bank_code').notNull(),
  bankAccount: text('bank_account').notNull(),
  bankId: text('bank_id').notNull(),
  

  try to know there detail first 
  transfer money to account themself than check with qrcode backend 

  api : http://localhost:3000/slip-verifications/shop
  return JSON.str{}
  
  
  
  
  */
  return (
    <div>
      <RestaurantForm
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        isValid={isValid}
        isSubmitting={isSubmitting}
        handleReset={reset}
      />
    </div>
  );
};

export default CreateShop;
