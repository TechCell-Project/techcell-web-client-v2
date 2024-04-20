'use client';

import { useEffect, useState } from "react";
import AddressModal from "@/components/common/modals/address-modal";
import { GetMeResponseDto } from "@techcell/node-sdk";

interface ModalProviderProps {
    userProfile: GetMeResponseDto;
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