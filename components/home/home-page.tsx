import Image from "next/image";
import Banner from '@/public/banner.png'
import { BRAND } from "@/constants/common";
import { Button } from "../ui/button";
import Link from "next/link";
import BrandPage from "../brands/brand";
import ListProduct from "./list-product";


const HomePage = () => {
    return (
        <div className="max-w-[!1320px]">

            {/* <BrandPage /> */}

            <ListProduct />

            <div className="mt-[10px]">
                <Image
                    src={Banner.src}
                    sizes='100vw'
                    width={1320}
                    height={300}
                    alt='banner'
                    className="w-full h-auto rounded-sm"
                />
            </div>
        </div>
    );
}

export default HomePage;