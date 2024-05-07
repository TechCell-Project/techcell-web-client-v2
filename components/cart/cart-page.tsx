import { Suspense } from 'react';

import { ProductCartSchema, VariationDto } from '@techcell/node-sdk';
import { productApiRequest } from '@/apiRequests/product';

import { ProductCart } from '@/types/cart.type';

import ListProductCart from './list-product-cart';
import CartSuggest from './cart-suggest';
import { BackButton } from '@/components/common/button-back';
import { Separator } from '@/components/ui/separator';
import { CartProductSkeleton } from './cart-product-skeleton';

export async function getProductVariation(
  id: string,
  skuId: string,
  quantity: number,
): Promise<ProductCart> {
  const { payload } = await productApiRequest.getProductInCart({ productId: id });

  const variation: VariationDto = payload.variations.find(
    (variation) => variation.skuId === skuId,
  ) as VariationDto;

  return {
    productId: payload.productId,
    productName: payload.productName,
    brand: payload.brand,
    variation,
    quantity,
  };
}

export type CartPageProps = {
  cartProducts: ProductCartSchema[];
};

export default async function CartPage({ cartProducts }: Readonly<CartPageProps>) {
  if (cartProducts.length === 0) return null;

  const promises = cartProducts.map((product) =>
    getProductVariation(product.productId, product.skuId, product.quantity),
  );

  const cartProductsDetail = await Promise.all(promises);

  return (

    <div className="">
      <div className="px-5 sm:container sm:max-w-[640px] lg:max-w-[768px]">
        <div className="w-full flex flex-col mt-5">
          <div className="w-full relative h-8 sm:h-10 flex items-center my-2 ">
            <div className="hidden sm:block">
              <BackButton />
            </div>
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl  sm:text-2xl font-semibold text-center">Giỏ hàng của bạn</p>
          </div>
          <Separator className="border-black" />
          <Suspense fallback={<CartProductSkeleton />}>
            <ListProductCart products={cartProductsDetail} />
          </Suspense>
        </div>
      </div>
      <CartSuggest />
    </div>
  );
}
