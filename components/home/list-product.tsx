'use client';

import { ProductInListDto } from '@techcell/node-sdk';
import { productApiRequest } from '@/apiRequests/product';
import { useEffect, useState } from 'react';
import { SuccinctCard } from '@/components/common/product-card/succinct-card';
import { NormalCard } from '@/components/common/product-card/normal-card';
import { ModalInformation } from '@/components/common/product-card/modal-information';
import { NormalCardSkeleton } from '../common/product-card/normal-card-skeleton';

export const ListProduct = async () => {
  const [products, setProducts] = useState<ProductInListDto[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProductByTags = async () => {
      setLoading(true);
      const res = await productApiRequest.getProducts({
        limit: 8,
      });

      if (res.status === 200) {
        setProducts(res.payload.data);
      }
      setLoading(false);
    };

    getProductByTags();
  }, []);

  if (loading) {
    return (
      <NormalCardSkeleton />   
    )
  }

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
