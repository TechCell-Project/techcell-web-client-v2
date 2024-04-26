'use client';

import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../styles/swiper.css';

// import required modules

import { Button } from '@/components/ui/button';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductInListDto } from '@techcell/node-sdk';
import { productApiRequest } from '@/apiRequests/product';
import { NormalCard } from '../common/product-card/normal-card';
import '../../styles/product.css';

interface ProductSimilarProps {
    productSimilar: string;
}

export const ProductSimilar = ({ productSimilar }: Readonly<ProductSimilarProps>) => {

    const [products, setProducts] = useState<ProductInListDto[]>([]);

    useEffect(() => {
        const getProductByTags = async () => {
            const res = await productApiRequest.getProducts({});

            if (res.status === 200) {
                setProducts(res.payload.data);
            }
        }

        getProductByTags();
    }, []);

    return (
        <div className="container flex flex-col">
            <div className='text-[20px] ml-10 uppercase font-bold'>Sản phẩm tương tự: <span className='text-[#ee4949]'>{productSimilar}</span></div>
            <div className="m-7 sm:m-10">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation, Autoplay]}
                    className="w-full"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id} className='rounded'>
                            {productSimilar == product.brandName && (
                                <NormalCard key={product.id} product={product} />
                            )}
                        </SwiperSlide>
                    ))}
                    <SwiperNavButtons />
                </Swiper>
            </div>
        </div>
    );
};

const SwiperNavButtons = () => {
    const swiper = useSwiper();
    const [isFirstSlide, setIsFirstSlide] = useState(true);
    const [isLastSlide, setIsLastSlide] = useState(false);

    useEffect(() => {
        const updateSlideStatus = () => {
            setIsFirstSlide(swiper.isBeginning);
            setIsLastSlide(swiper.isEnd);
        };

        updateSlideStatus(); // Initial check

        swiper.on('slideChange', updateSlideStatus);

        return () => {
            swiper.off('slideChange', updateSlideStatus);
        };
    }, [swiper]);

    return (
        <div className='swiper-nav-btns w-full flex justify-between items-center px-0 sm:px-2.5 absolute left-0 top-1/2 z-10 -translate-y-1/2'>
            {!isFirstSlide && (
                <Button
                    className='w-[30px] sm:w-[50px] h-[30px] sm:h-[50px] rounded-full p-0 bg-transparent hover:bg-rose-50'
                    onClick={() => swiper.slidePrev()}
                >
                    <ChevronLeft className='size-[35px] text-[#ee4949]' />
                </Button>
            )}
            <div className="flex-grow"></div>
            {!isLastSlide && (
                <Button
                    className='w-[30px] sm:w-[50px] h-[30px] sm:h-[50px] rounded-full p-0 bg-transparent hover:bg-red-50'
                    onClick={() => swiper.slideNext()}
                >
                    <ChevronRight className='size-[35px] text-[#ee4949]' />
                </Button>
            )}
        </div>

    );
};
