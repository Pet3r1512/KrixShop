import { CustomerInfo } from "@/pages/shipment";
import { create } from "zustand";

export type CustomerState = {
  customer: CustomerInfo;
};

export type CustomerActions = {
  setCustomer: (customer: CustomerInfo) => void;
  getCustomer: () => CustomerInfo;
};

export type CustomerStore = CustomerState & CustomerActions;

export const defaultCustomerState: CustomerState = {
  customer: {
    name: "",
    phone_number: "",
  },
};

export const useCustomerStore = create<CustomerStore>((set, get) => ({
  ...defaultCustomerState,
  setCustomer: (customer: CustomerInfo) => {
    set((state) => ({
      ...state,
      customer: {
        ...state.customer,
        ...customer,
      },
    }));
  },
  getCustomer() {
    return get().customer;
  },
}));
