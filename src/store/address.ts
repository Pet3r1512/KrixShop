import { Address } from "@/pages/shipment";
import create from "zustand";

export type AddressState = {
  address: Address;
};

export type AddressActions = {
  setAddress: (address: Address) => void;
  getAddress: () => Address;
};

export type AddressStore = AddressState & AddressActions;

export const defaultAddressState: AddressState = {
  address: {
    province: "",
    district: "",
    ward: "",
    street: "",
    note: "",
  },
};

export const useAddressStore = create<AddressStore>((set, get) => ({
  ...defaultAddressState,
  setAddress: (address: Address) => {
    set((state) => ({
      ...state,
      address: {
        ...state.address,
        ...address,
      },
    }));
  },
  getAddress() {
    return get().address;
  },
}));
