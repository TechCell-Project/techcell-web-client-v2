'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import CardProductCart from './card-product-cart';

import { ProductCart } from '@/types/cart.type';
import { useDebounceFn, useUpdateEffect } from 'ahooks';
import { currencyFormat } from '@/utilities/func.util';
import { scrollToTop } from '@/lib/utils';
import { CheckedState } from '@radix-ui/react-checkbox';

import { authApiRequest } from '@/apiRequests';
import { RootPath } from '@/constants';

export type ListProductCartProps = {
  products: ProductCart[];
};

export default function ListProductCart({ products }: Readonly<ListProductCartProps>) {
  const { push } = useRouter(); 
  const [selectedSku, setSelectedSku] = useState<string[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [showUncheckMsg, setShowUncheckMsg] = useState<boolean>(false);
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

  const handleSelectAll = () => {
    if (selectedSku.length === 0 || selectedSku.length !== products.length) {
      setSelectedSku(products.map((product) => product.variation.skuId));
      setShowUncheckMsg(false);
      return;
    }
    setSelectedSku([]);
  };

  const handleCheckBox = (checked: CheckedState, skuId: string) => {
    if (checked) {
      setSelectedSku([...selectedSku, skuId]);
      setShowUncheckMsg(false);
      return;
    }
    setSelectedSku(selectedSku.filter((sku) => sku !== skuId));
  };

  useUpdateEffect(() => {
    if (selectedSku.length === 0) {
      setCurrentPrice(0);
      return;
    }

    let total = 0;
    selectedSku.forEach((sku) => {
      const matchedProduct = products.find((product) => product.variation.skuId === sku);
      if (matchedProduct) {
        total +=
          (matchedProduct.variation.price.special !== 0
            ? matchedProduct.variation.price.special
            : matchedProduct.variation.price.base) * matchedProduct.quantity;
      }
    });
    setCurrentPrice(total);
  }, [selectedSku]);

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
    if (selectedSku.length === 0) {
      setShowUncheckMsg(true);
      scrollToTop();
      return;
    }

    run();
  };

  return (
    <div className="flex flex-col">
      {showUncheckMsg && (
        <h3 className="my-2 text-destructive text-base sm:text-lg text-center">
          Bạn cần chọn sản phẩm trước khi tiến hành thanh toán
        </h3>
      )}

      <div className="flex flex-row items-center mb-2 p-2">
        <Checkbox
          checked={selectedSku.length === products.length}
          onCheckedChange={handleSelectAll}
        />
        <p className="ml-2 text-lg">Chọn tất cả</p>
      </div>

      {products.map((product) => (
        <div
          key={product.variation?.skuId}
          className="w-full flex gap-2.5 items-center bg-white rounded-xl my-2.5"
        >
          <Checkbox
            checked={selectedSku.includes(product.variation?.skuId)}
            className="ml-2.5"
            onCheckedChange={(checked) => handleCheckBox(checked, product.variation.skuId)}
          />
          <CardProductCart product={product} />
        </div>
      ))}
      <div className="flex justify-between items-center bg-white h-20 px-2.5 sm:px-5 rounded-xl">
        <span className="text-lg">Tạm tính: {currencyFormat(currentPrice)}</span>
        <Button variant="default" onClick={handleClickCheckout}>
          <span>Thanh toán</span>
        </Button>
      </div>
    </div>
  );
}
