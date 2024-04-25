'use client';

import { useState } from 'react';

import { useInView } from 'react-intersection-observer';

import {
  ProductInListDto,
  ProductsApiProductsControllerGetProductsRequest,
} from '@techcell/node-sdk';

import { getProducts } from '@/app/(public)/danh-sach-san-pham/action';

import { NormalCard } from '@/components/common/product-card/normal-card';
import { Icons } from '@/components/icons';
import { useUpdateEffect } from 'ahooks';
import { productApiRequest } from '@/apiRequests/product';

let page = 2;

export default function LoadMore({
  filters,
  limit,
  sort,
}: Omit<ProductsApiProductsControllerGetProductsRequest, 'page'>) {
  const { ref, inView } = useInView();

  const [products, setProducts] = useState<ProductInListDto[]>([]);
  const [haveNextPage, setHaveNextPage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useUpdateEffect(() => {
    if (inView && haveNextPage) {
      setIsLoading(true);

      const delay = 500;

      const timeoutFetching = setTimeout(() => {
        productApiRequest
          .getProducts({
            page,
            filters,
            sort,
            limit,
          })
          .then(({ payload }) => {
            setProducts([...products, ...payload.data]);
            setHaveNextPage(payload.hasNextPage);
            page++;
          });

        setIsLoading(false);
      }, delay);

      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timeoutFetching);
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
          {inView && isLoading && <Icons.spinner className="h-14 w-14 animate-spin" />}
        </div>
      </div>
    </>
  );
}
