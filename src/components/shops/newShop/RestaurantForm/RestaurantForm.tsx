import { FormActions, RestaurantInfoFields } from "./RestaurantInfoFields";

const RestaurantForm = ({
  register,
  errors,
  onSubmit,
  isValid,
  isSubmitting,
  handleReset,
}: any) => (
  <form
    onSubmit={onSubmit}
    className="flex-1 bg-white sm:mx-10 md:mx-30 lg:mx-80 rounded-xl shadow-md p-6 space-y-6 border border-gray-100"
    autoComplete="off"
    noValidate
  >
    <h2 className="text-xl font-bold text-gray-900 mb-2">Restaurant Details</h2>
    <RestaurantInfoFields register={register} errors={errors} />

    <FormActions
      isValid={isValid}
      isSubmitting={isSubmitting}
      handleReset={handleReset}
    />
  </form>
);

export default RestaurantForm;
