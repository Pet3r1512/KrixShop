import create from "zustand";

// Define the Item type
export type Item = {
  xata_id: string;
  name: string;
  selectedColor: string;
  selectedSize: string;
  selectedQuantity: number;
  price: number;
};

// Define the CartState type which includes an array of Items
export type CartState = {
  items: Item[];
};

// Define the CartActions type which includes actions to manipulate the cart
export type CartActions = {
  addItem: (item: Item) => void;
  removeItem: (
    xata_id: string,
    selectedColor: string,
    selectedSize: string
  ) => void;
  readItems: () => Item[];
  count: () => number;
  getCurrentOrder: () => { NumberOfItems: number; subtotal: number };
};

// Combine CartState and CartActions to form the CartStore type
export type CartStore = CartState & CartActions;

// Initialize the cart store with an empty items array
export const defaultCartState: CartState = {
  items: [],
};

// Create the cart store using Zustand
export const useCartStore = create<CartStore>((set, get) => ({
  ...defaultCartState,
  addItem: (item: Item) =>
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (i) =>
          i.xata_id === item.xata_id &&
          i.selectedColor === item.selectedColor &&
          i.selectedSize === item.selectedSize
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].selectedQuantity +=
          item.selectedQuantity;
        return { items: updatedItems };
      } else {
        return { items: [...state.items, item] };
      }
    }),
  removeItem: (xata_id: string, selectedColor: string, selectedSize: string) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.xata_id === xata_id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
            ? { ...item, selectedQuantity: item.selectedQuantity - 1 }
            : item
        )
        .filter((item) => item.selectedQuantity > 0),
    })),
  readItems: () => get().items,
  count: () => {
    let count = 0;
    get().items.map((item) => {
      count += item.selectedQuantity;
    });
    return count;
  },
  getCurrentOrder: () => {
    let subtotal = 0;
    let NumberOfItems = 0;
    get().items.map((item) => {
      subtotal += item.price * item.selectedQuantity;
      NumberOfItems += item.selectedQuantity;
    });
    return {
      NumberOfItems: NumberOfItems,
      subtotal: subtotal,
    };
  },
}));
