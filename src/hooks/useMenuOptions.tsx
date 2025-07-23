import type { MenuOption, SelectedOptionWithQuantity } from "@/type/Menu.type";
import { useState } from "react";

export const useMenuOptions = () => {
  const [selectedOptions, setSelectedOptions] = useState<
    SelectedOptionWithQuantity[]
  >([]);

  const handleOptionSelect = (option: MenuOption) => {
    setSelectedOptions((prev) => {
      const existing = prev.find((item) => item.option.id === option.id);
      if (existing) {
        return prev.map((item) =>
          item.option.id === option.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // เพิ่ม option ใหม่
        return [...prev, { option, quantity: 1 }];
      }
    });
  };

  const handleDecrement = (optionId: string) => {
    setSelectedOptions((prev) => {
      return prev
        .map((item) => {
          if (item.option.id === optionId) {
            const newQuantity = item.quantity - 1;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean) as SelectedOptionWithQuantity[];
    });
  };

  const handleIncrement = (optionId: string) => {
    setSelectedOptions((prev) => {
      return prev.map((item) =>
        item.option.id === optionId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  };

  const handleRemoveOption = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.filter((item) => item.option.id !== optionId)
    );
  };

  const getTotalPrice = () => {
    return selectedOptions.reduce((total, item) => {
      return total + Number(item.option.price) * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return selectedOptions.reduce((total, item) => total + item.quantity, 0);
  };

  const resetOptions = () => {
    setSelectedOptions([]);
  };

  return {
    selectedOptions,
    handleOptionSelect,
    handleDecrement,
    handleIncrement,
    handleRemoveOption,
    getTotalPrice,
    getTotalItems,
    resetOptions,
  };
};
