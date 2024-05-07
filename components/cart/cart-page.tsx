import { ProductCartSchema, VariationDto } from '@techcell/node-sdk';
import { productApiRequest } from '@/apiRequests/product';

import { ProductCart } from '@/types/cart.type';

import ListProductCart from './list-product-cart';
import { Button } from '../ui/button';
import AddressCart from './address-cart';
import Image from 'next/image';
import CartSuggest from './cart-suggest';
import ButtonCart from './button-cart';

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
    <div className="px-5 sm:container pb-4 h-auto">
        <div className='w-full text-center my-4 text-lg'>Giỏ hàng của bạn</div>
      <div className="flex flex-col sm:flex-row sm:justify-between md:justify-between lg:justify-between xl:justify-between 2xl:justify-between gap-5 w-full h-auto my-2">
        <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-2/3 h-auto ">
          <div className="flex flex-col gap-4">
            {/* danh sách sản phẩm */}
            <div className="p-4 w-full bg-white rounded-md h-auto">
              <ListProductCart products={cartProductsDetail} />
            </div>

            {/* chọn địa chỉ */}
            <div className="p-4 w-full bg-white rounded-md h-auto">
              <AddressCart />
            </div>

          {/* <CartSuggest /> */}


          </div>
        </div>
        <div className="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 h-[100px]  sticky top-4">
          <ButtonCart  products={cartProductsDetail}/>
        </div>
      </div>

    </div>
  );
}
