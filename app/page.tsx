import { BENEFIT_SECTION, HOME_SLOGAN, IMAGE_CAROUSEL } from '@/constants/common';
import { SwiperCarousel } from '@/components/home/swiper-carousel';
import { ListProductHot } from '@/components/home/list-product-hot';
import Image from 'next/image';
import Banner from '@/public/banner/banner.png';
import { ListProduct } from '@/components/home/list-product';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RootPath } from '@/constants/enum';
import MaxWidthWrapper from '@/components/common/max-width-wrapper';
import { productApiRequest } from '@/apiRequests';
import { Suspense } from 'react';
import { NormalCardSkeleton } from '@/components/common/product-card/normal-card-skeleton';

export default async function Home() {
  const hotProductsReq = productApiRequest.getProducts({
    limit: 4,
    // filters: JSON.stringify({ tagIds: ['661b7c18128dfd9b6b3e19de'] }),
  });

  const normalProductsReq = productApiRequest.getProducts({
    limit: 8,
  });

  const homeProductsRes = await Promise.all([hotProductsReq, normalProductsReq]);

  return (
    <main>
      <h2 className="w-full hidden sm:block text-base uppercase bg-primary text-white py-2.5 text-center">
        {HOME_SLOGAN}
      </h2>

      <SwiperCarousel imgLabels={IMAGE_CAROUSEL} />

      <div className="container">
        <Suspense fallback={<NormalCardSkeleton />}>
          <ListProductHot products={homeProductsRes[0].payload.data} />
        </Suspense>
      </div>

      <MaxWidthWrapper>
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

        <Suspense fallback={<NormalCardSkeleton />}>
          <ListProduct products={homeProductsRes[1].payload.data} />
        </Suspense>

        <div className="flex flex-row justify-center my-5">
          <Link href={RootPath.ProductList}>
            <Button
              variant="default"
              className="text-primary border border-solid border-rose-300 bg-white hover:bg-primary hover:text-white text-[14px] sm:text-[16px] font-bold uppercase "
            >
              Xem tất cả
            </Button>
          </Link>
        </div>
      </MaxWidthWrapper>

      <div className="bg-slate-100 mt-5">
        <div className="max-w-full px-0 sm:container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {BENEFIT_SECTION.map((benefit) => (
              <div key={benefit.title} className="flex justify-center items-center my-5 h-20 gap-5">
                <div className="font-blod">
                  <benefit.icon />
                </div>
                <div className="max-w-[180px]">
                  <p className="text-[18px] font-bold">{benefit.title}</p>
                  <p className="text-[16px] opacity-90">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
