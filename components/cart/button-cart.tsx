'use client';
import { ProductCart } from '@/types/cart.type';
import { Button } from '../ui/button';
import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';
import { RootPath } from '@/constants';
import { useRouter } from 'next/navigation';
import { authApiRequest } from '@/apiRequests';
export type ListProductCartProps = {
  products: ProductCart[];
};

const ButtonCart = ({ products }: Readonly<ListProductCartProps>) => {
  const { push } = useRouter();
  const [selectedSku, setSelectedSku] = useState<string[]>([]);
  const [defaultAddressIndex, setDefaultAddressIndex] = useState<number | null>(null);

  useEffect(() => {
    const getDefaultIndex = async () => {
      const { payload } = await authApiRequest.getMeClient();

      if (payload.address) {
        setDefaultAddressIndex(payload.address.findIndex((address) => address.isDefault));
      }
    };
    getDefaultIndex();
  }, []);
  const { run } = useDebounceFn(
    () => {
      const matchedProduct = products.filter((product) =>
        selectedSku.includes(product.variation.skuId),
      );

      const productsToPreview = matchedProduct.map((product) => {
        return `${product.variation.skuId}-${product.quantity}`;
      });

      localStorage.setItem(
        'selected-sku',
        productsToPreview.toString() + '/' + defaultAddressIndex?.toString(),
      );
      push(RootPath.Payment);
    },
    {
      wait: 1000,
    },
  );

  const handleClickCheckout = () => {
    run();
  };
  return (
    <div className="flex justify-between items-center bg-white h-20 px-2.5 sm:px-5 rounded-xl">
      <span className="text-lg">Tạm tính: </span>
      <Button variant="default" onClick={handleClickCheckout}>
        <span>Tiến hành đặt hàng</span>
      </Button>
    </div>
  );
};

export default ButtonCart;
