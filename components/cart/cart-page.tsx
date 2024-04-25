'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import CartEmpty from './cart-empty';
import ListProductCart from './list-product-cart';
import CartSuggest from './cart-suggest';
import { Cart } from '@techcell/node-sdk';

export type CartPageProps = {
  cart: Cart;
};

export default function CartPage({ cart }: CartPageProps) {
  return (
    <div className="container">
      <div className=" flex flex-col justify-center items-center">
        <div className="flex flex-col py-[20px]">
          <div className="flex flex-row items-center my-2">
            <Link href="/">
              <ArrowLeft className="size-[35px]" />
            </Link>
            <span className="text-[25px] font-semibold w-[600px] text-center">
              Giỏ hàng của bạn
            </span>
          </div>
          <Separator />
        </div>
        {(cart?.products?.length ?? 0) > 0 ? (
          <ListProductCart products={cart?.products} />
        ) : (
          <CartEmpty />
        )}
      </div>
      <CartSuggest />
    </div>
  );
}
