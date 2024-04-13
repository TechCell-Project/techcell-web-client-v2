'use client';

import { useEffect, useState } from "react";
import { ProfileModal } from "@/components/profile/profile-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    });

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <ProfileModal />
        </>
    )
}