'use client';

import { useEffect, useState } from "react";
import AddressModal from "@/components/common/modals/address-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AddressModal />
        </>
    )
}