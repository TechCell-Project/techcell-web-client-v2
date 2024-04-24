import Image from "next/image";
import Banner from '@/public/banner.png'
import BrandPage from "../brands/brand";
import ListProduct from "./list-product";
import { ListProductHot } from "./list-product-hot";
import { PHONE_TEST } from "@/constants/phone-test";


const HomePage = () => {
    return (
        <div className="max-w-[!1320px]">

            <ListProductHot phone={PHONE_TEST} />
            
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

            <BrandPage />

            <ListProduct />

        </div>
    );
}

export default HomePage;