'use client';

import { useEffect, useState } from 'react';

import {
  ProductInListDto,
  ProductsApiProductsControllerGetProductsRequest,
} from '@techcell/node-sdk';

import LoadMore from './load-more';
import { NormalCard } from '@/components/common/product-card/normal-card';
import { ModalInformation } from '@/components/common/product-card/modal-information';

interface ProductsListProps {
  products: ProductInListDto[];
}

export const ProductsList = ({
  products,
  ...searchParams
}: ProductsListProps & Omit<ProductsApiProductsControllerGetProductsRequest, 'page'>) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <div className="w-full flex flex-col items-center sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <NormalCard key={product.id} product={product} onClickBuying={() => setSelectedId(product.id)} />
        ))}
      </div>
      <LoadMore filters={searchParams?.filters} sort={searchParams?.sort} />
      <ModalInformation
        onClose={() => setSelectedId(null)}
        productId={selectedId}
      />
    </>
  );
};
