'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';
import { ProductCartProps } from './product-cart';
import { useDebounceFn } from 'ahooks';
import { cartApiRequest } from '@/apiRequests/cart';
import { useRouter } from 'next/navigation';

export type UpdateProductCartProps = ProductCartProps;

export default function UpdateProductCart({ products, index }: UpdateProductCartProps) {
  const product = products[index];

  const router = useRouter();
  const { productId, skuId, quantity: initialQuantity } = product;
  const [quantity, setQuantity] = useState(initialQuantity);

  const updateCart = useDebounceFn(
    async () => {
      products[index].quantity = quantity;
      await cartApiRequest.updateCartClient({
        products: products,
      });
    },
    {
      wait: 1000,
    },
  );

  useEffect(() => {
    if (quantity !== initialQuantity) {
      updateCart.run();
    }
  }, [updateCart, quantity, initialQuantity]);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  return (
    <>
      <div className="flex flex-row">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecreaseQuantity}
          disabled={quantity === 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="mx-4">{quantity}</span>
        <Button variant="outline" size="icon" onClick={handleIncreaseQuantity}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="cursor-pointer">
        <Trash2 />
      </div>
    </>
  );
}
