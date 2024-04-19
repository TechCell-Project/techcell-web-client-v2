'use client';

import { useEffect, useState } from "react";
import AddressModal from "@/components/common/modals/address-modal";
import { User } from "@techcell/node-sdk";

interface ModalProviderProps {
    userProfile: User;
}

export const ModalProvider = ({ userProfile }: ModalProviderProps) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AddressModal addressList={userProfile.address ?? []} />
        </>
    )
}