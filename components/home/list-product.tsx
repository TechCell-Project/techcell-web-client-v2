'use client';

import { ProductInListDto } from '@techcell/node-sdk';
import { productApiRequest } from '@/apiRequests/product';
import { useEffect, useState } from 'react';
import { SuccinctCard } from '../common/product-card/succinct-card';

export const ListProduct = async () => {

  const [products, setProducts] = useState<ProductInListDto[]>([]);

  useEffect(() => {
    const getProductByTags = async () => {
      const res = await productApiRequest.getProducts({
        limit: 8,
      });

      if (res.status === 200) {
        setProducts(res.payload.data);
      }
    }

    getProductByTags();
  }, []);

  return (
    <div className="w-full flex flex-col items-center sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-7">
      {products.map((product) => (
        <SuccinctCard key={product.id} product={product} />
      ))}
    </div>
  );
};


