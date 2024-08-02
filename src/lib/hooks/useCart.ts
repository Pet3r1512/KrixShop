import { useCartStore } from "@/store/cart";

export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const readItems = useCartStore((state) => state.readItems);

  return {
    items,
    addItem,
    removeItem,
    readItems,
  };
};
