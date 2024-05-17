'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';

import { OrderPreviewStore, createOrderPreviewStore } from '@/stores/order-preview.store';

const OrderPreviewStoreContext = createContext<StoreApi<OrderPreviewStore> | null>(null,);

export interface OrderPreviewProviderProps {
  children: ReactNode;
}

export const OrderPreviewProvider = ({ children }: OrderPreviewProviderProps) => {
  const storeRef = useRef<StoreApi<OrderPreviewStore>>();
  if (!storeRef.current) {
    storeRef.current = createOrderPreviewStore();
  }

  return (
    <OrderPreviewStoreContext.Provider value={storeRef.current}>
      {children}
    </OrderPreviewStoreContext.Provider>
  )
}

export const useOrderPreviewStore = <T,>(selector: (store: OrderPreviewStore) => T,): T => {
  const orderPreviewStoreContext = useContext(OrderPreviewStoreContext);

  if (!orderPreviewStoreContext) {
    throw new Error(`useOrderPreviewStore must be use within OrderPreviewProvider`);
  }

  return useStore(orderPreviewStoreContext, selector);
}
