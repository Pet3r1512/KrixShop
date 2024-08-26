import { useCardStore } from "@/store/card";

export const useCard = () => {
  const setCard = useCardStore((state) => state.setCard);
  const getCard = useCardStore((state) => state.getCard);

  return { setCard, getCard };
};
