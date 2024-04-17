
import { UserAddressSchema } from '@techcell/node-sdk';
import { create } from 'zustand';

type AddressModalState = {
  isOpen: boolean;
  addressIndex: number | null;
  addressList: UserAddressSchema[] | [];
  
}

type AddressModalActions = {
  setAddress: (address: number | null) => void;
  setAddressList: (addressList: UserAddressSchema[] | []) => void;
  onOpen: () => void;
  onClose: () => void;
}

type AddressModalStore = AddressModalState & AddressModalActions;

export const useAddressModal = create<AddressModalStore>((set) => ({
  isOpen: false,
  addressIndex: null,
  addressList: [],
  setAddress: (index: number | null) => set({ addressIndex: index }),
  setAddressList: (addressList: UserAddressSchema[] | []) => set({ addressList }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
