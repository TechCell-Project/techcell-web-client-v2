'use client';

import Image from 'next/image';
import Banner from '@/public/banner/banner.png';
import BrandHomePage from '../brands/brand';
import { ListProductHot } from './list-product-hot';
import BannerSection from './banner-page';
import { ListProduct } from './list-product';


const HomePage = () => {
    return (
        <div className="max-w-[!1320px]">
            <BannerSection />

            <ListProductHot />

            <div className="mt-[10px]">
                <Image
                    src={Banner.src}
                    sizes="100vw"
                    width={1320}
                    height={300}
                    alt="banner"
                    className="w-full h-auto rounded-sm"
                />
            </div>

            <BrandHomePage />

            <ListProduct />

            {/* <ProductsPage /> */}
        </div>
    );
};

export default HomePage;
