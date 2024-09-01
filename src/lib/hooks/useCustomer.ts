import { useCustomerStore } from "@/store/customer";

export const useCustomer = () => {
  const setCustomer = useCustomerStore((state) => state.setCustomer);
  const getCustomer = useCustomerStore((state) => state.getCustomer);

  return {
    setCustomer,
    getCustomer,
  };
};
