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
                    src={Banner}
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                    alt='banner'
                />
            </div>
        </div>
    );
}

export default HomePage;