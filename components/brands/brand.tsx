'use client';

import { useEffect, useState } from "react";
import LoadingPage from "@/app/loading";
import { Brand } from "@/components/brands/models";
import { getListBrandApi } from "@/apiRequests/brand";

interface BrandProps {
    brand: Brand;
}

const BrandPage = ({ brand }: BrandProps) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [currentBrand, setCurrentBrand] = useState<Brand>(brand);

    useEffect(() => {
        getBrand();
        setIsMounted(true);
    }, []);

    async function getBrand() {
        try {
            const res = await getListBrandApi();
            setCurrentBrand(res.payload);
        } catch (error) {
            console.error("Error fetching brand:", error);
        }
    }

    if (!isMounted) {
        return <LoadingPage />;
    }

    console.log(currentBrand);

    return (
        <div className="my-[40px] flex flex-row items-center">
            <span className="text-[25px] mr-[20px] font-bold uppercase">Thương hiệu</span>
            <div>
                <h2 className="text-[25px]">{currentBrand?.name}</h2>
            </div>
        </div>
    );
}

export default BrandPage;
