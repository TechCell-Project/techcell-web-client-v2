'use client';

import { ProductInListDto } from '@techcell/node-sdk';
import { productApiRequest } from '@/apiRequests/product';
import { NormalCard } from '../common/product-card/normal-card';
import { useEffect, useState } from 'react';

export const ListProduct = async () => {

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
    <div className="w-full flex flex-col items-center sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
      {products.map((product) => (
        <NormalCard key={product.id} product={product} />
      ))}
    </div>
  );
};


