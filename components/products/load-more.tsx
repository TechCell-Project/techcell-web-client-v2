'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useInView } from 'react-intersection-observer';

import {
  ProductInListDto,
  ProductsApiProductsControllerGetProductsRequest,
} from '@techcell/node-sdk';

import { NormalCard } from '@/components/common/product-card/normal-card';
import { Icons } from '@/components/icons';
import { useDebounceFn, useUpdateEffect } from 'ahooks';
import { productApiRequest } from '@/apiRequests/product';

let page = 2;

export default function LoadMore({
  ...payload
}: Readonly<Omit<ProductsApiProductsControllerGetProductsRequest, 'page'>>) {
  const { refresh } = useRouter();
  const { ref, inView } = useInView();

  const [products, setProducts] = useState<ProductInListDto[]>([]);
  const [haveNextPage, setHaveNextPage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(payload);

  const { run } = useDebounceFn(
    async () => {
      const res = await productApiRequest.getProducts({
        page,
        ...payload,
      });

      setProducts([...products, ...res.payload.data]);
      if (res.payload.hasNextPage) {
        setHaveNextPage(true);
        page++;
      } else {
        setHaveNextPage(false);
      }
      setIsLoading(false);
      refresh();
    },
    {
      wait: 1000,
    },
  );

  useUpdateEffect(() => {
    if (inView && haveNextPage) {
      setIsLoading(true);
      run();
    }
  }, [inView]);

  return (
    <>
      <div className="w-full flex flex-col items-center sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <NormalCard key={product.id} product={product} />
        ))}
      </div>
      <div className="w-full flex justify-center items-center h-20">
        <div ref={ref}>
          {inView && isLoading && <Icons.spinner className="h-14 w-14 animate-spin text-primary" />}
        </div>
      </div>
    </>
  );
}
