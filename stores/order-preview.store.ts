import { PreviewOrderResponseDto } from "@techcell/node-sdk"
import { create } from "zustand";

export type OrderPreviewState = {
    previewData: PreviewOrderResponseDto | null;
    addressIndex: number;
    isBuyFromCart: boolean;
}

export type OrderPreviewActions = {
    setPreviewData: (data: PreviewOrderResponseDto) => void;
    setAddressIndex: (index: number) => void;
    setIsBuyFromCart: () => void;
    clearPreview: () => void;
}

export type OrderPreviewStore = OrderPreviewState & OrderPreviewActions;

const initialState: OrderPreviewState = {
    previewData: null,
    addressIndex: 0,
    isBuyFromCart: false,
}

export const createOrderPreviewStore = (initState: OrderPreviewState = initialState) => {
    return create<OrderPreviewStore>()((set) => ({
        ...initState,
        setPreviewData: (data: PreviewOrderResponseDto) => set(() => ({ previewData: data })),
        setAddressIndex: (index: number) => set(() => ({ addressIndex: index })),
        setIsBuyFromCart: () => set(() => ({ isBuyFromCart: true })),
        clearPreview: () => set(() => ({ previewData: null, isBuyFromCart: false })),
    }))
}

