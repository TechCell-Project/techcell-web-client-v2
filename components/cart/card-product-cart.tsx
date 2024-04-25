import Image from 'next/image';
import { currencyFormat, getVariationString } from '@/utilities/func.util';
import UpdateProductCart from './update-product-cart';
import { ProductCart } from '@/types/cart.type';
import AlternativeImg from '@/public/phone-test/15-promax.jpg';
import { memo } from 'react';

export type ProductCartProps = {
  product: ProductCart;
};

function CardProductCart({ product }: Readonly<ProductCartProps>) {
  return (
    <div className="w-full h-40">
      <div className="h-full w-full flex flex-row items-center">
        <div className="max-w-[120px] w-full h-[120px] flex flex-col items-center">
          <Image
            src={product.variation.image ? product.variation.image.url : AlternativeImg.src}
            alt={product.productName}
            width={400}
            height={400}
            className="h-[120px] w-[120px] object-cover object-center"
          />
        </div>
        <div className="flex flex-row w-full items-center">
          <div className="flex w-[65%] flex-col ml-4">
            <h4 className="text-lg font-semibold">
              {product.productName + ' ' + getVariationString(product.variation.attributes)}
            </h4>

            <span className="my-2 text-primary text-lg font-semibold">
              {currencyFormat(
                (product.variation.price.special !== 0
                  ? product.variation.price.special
                  : product.variation.price.base) * product.quantity,
              )}
              đ
              {product.variation.price.special !== 0 && (
                <span className="ml-2 text-slate-500 text-base line-through">
                  {currencyFormat(product.variation.price.base * product.quantity)}đ
                </span>
              )}
            </span>
          </div>

          <div className="w-[35%]">
            <UpdateProductCart
              product={{
                productId: product.productId,
                skuId: product.variation.skuId,
                quantity: product.quantity,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CardProductCart);