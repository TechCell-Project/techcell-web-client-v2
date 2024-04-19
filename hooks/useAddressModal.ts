
import { create } from 'zustand';

type AddressModalState = {
  isOpen: boolean;
  addressIndex: number | null;
}

type AddressModalActions = {
  setAddressIndex: (address: number | null) => void;
  onOpen: () => void;
  onClose: () => void;
}

type AddressModalStore = AddressModalState & AddressModalActions;

export const useAddressModal = create<AddressModalStore>((set) => ({
  isOpen: false,
  addressIndex: null,
  setAddressIndex: (index: number | null) => set({ addressIndex: index }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
