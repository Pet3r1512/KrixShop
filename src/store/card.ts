import { CardInfo } from "@/components/Cart/Payment/Instruction/Cards";
import create from "zustand";

export type CardState = {
  card: CardInfo;
};

export type CardActions = {
  setCard: (card: CardInfo) => void;
  getCard: () => CardInfo;
};

export type CardStore = CardState & CardActions;

export const defaultCardState: CardState = {
  card: {
    bank: "",
    name: "",
    cardNumber: {
      number: "",
      checked: false,
    },
    cvv: "",
    expired: {
      month: "",
      year: "",
    },
  },
};

export const useCardStore = create<CardStore>((set, get) => ({
  ...defaultCardState,
  setCard: (card: CardInfo) => {
    set((state) => ({
      ...state,
      card: {
        ...state.card,
        ...card,
      },
    }));
  },
  getCard() {
    return get().card;
  },
}));
