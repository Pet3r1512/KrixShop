import { useAddressStore } from "@/store/address";

export const useAddress = () => {
  const setAddress = useAddressStore((state) => state.setAddress);
  const getAddress = useAddressStore((state) => state.getAddress);
  return { setAddress, getAddress };
};
