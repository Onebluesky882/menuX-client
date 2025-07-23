import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RestaurantInfoFields = ({ register, errors }: any) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="name" className="font-medium">
        Restaurant Name <span className="text-red-500">*</span>
      </Label>
      <Input
        {...register("name")}
        id="name"
        placeholder="Awesome Diner"
        className="mt-1 focus:border-none"
      />
      {errors.name && (
        <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
      )}
    </div>
    <div>
      <Label htmlFor="address" className="font-medium">
        Address
      </Label>
      <Input
        {...register("address")}
        id="address"
        placeholder="123 ลำปางหนา"
        className="mt-1 focus:border-none"
      />
      {errors.address && (
        <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
      )}
    </div>
  </div>
);

export const FormActions = ({ isValid, isSubmitting, handleReset }: any) => {
  return (
    <div className="flex items-center justify-center gap-4 pt-2">
      <Button
        type="submit"
        className="font-semibold bg-blue-500 text-white text-base px-5 py-2 rounded-lg"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
      <Button
        variant="outline"
        className="text-base px-5 py-2 rounded-lg"
        onClick={handleReset}
        type="button"
      >
        Reset
      </Button>
    </div>
  );
};
