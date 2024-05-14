import { Suspense } from 'react';
import { ProductCartSchema, VariationDto } from '@techcell/node-sdk';
import { productApiRequest } from '@/apiRequests/product';

import { ProductCart } from '@/types/cart.type';

import { CartProductSkeleton } from './cart-product-skeleton';
import { CartDataTable } from './table/cart-data-table';

import AlternativeImg from '@/public/phone-test/15-promax.jpg';

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

  const cartProductsData = (await Promise.all(promises)).map((product) => {
    return {
      id: product.productId,
      variation: {
        skuId: product.variation.skuId,
        attributes: product.variation.attributes,
      },
      thumbnail: product.variation.image ? product.variation.image.url : AlternativeImg.src,
      name: product.productName,
      price: product.variation.price,
      quantity: product.quantity,
    };
  });

  console.log(cartProductsData);

  return (
    <div className="px-5 sm:container pb-4 h-auto">
      <div className="w-full text-center mt-5 py-4 text-lg">Giỏ hàng của bạn</div>
      <div className="flex flex-col sm:flex-row sm:justify-between md:justify-between lg:justify-between xl:justify-between 2xl:justify-between gap-5 w-full h-auto my-2">
        {/* danh sách sản phẩm */}
        <Suspense fallback={<CartProductSkeleton />}>
          <CartDataTable data={cartProductsData} />
        </Suspense>
      </div>
    </div>
  );
}
