'use client';

import { useState } from 'react';
import { NormalCard } from '@/components/common/product-card/normal-card';
import { ModalInformation } from '@/components/common/product-card/modal-information';
import { ProductInListDto } from '@techcell/node-sdk';

interface HomeProductListProps {
  products: ProductInListDto[];
}

export const ListProduct = ({ products }: HomeProductListProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <div className="w-full flex flex-col items-center sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-7">
        {products.map((product) => (
          <NormalCard
            key={product.id}
            product={product}
            onClickBuying={() => setSelectedId(product.id)}
          />
        ))}
      </div>
      <ModalInformation onClose={() => setSelectedId(null)} productId={selectedId} />
    </>
  );
};
