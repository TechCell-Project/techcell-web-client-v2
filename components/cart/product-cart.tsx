import Image from 'next/image';
import { Checkbox } from '../ui/checkbox';
import { productApiRequest } from '@/apiRequests/product';
import { currencyFormat, getVariationString } from '@/utilities/func.util';
import { ProductCartSchema } from '@techcell/node-sdk';
import UpdateProductCart from './update-product-cart';

export type ProductCartProps = {
  products: ProductCartSchema[];
  index: number;
};

export default async function ProductCart({ products, index }: ProductCartProps) {
  const product = products[index];
  const { productId, skuId } = product;

  const { payload: productWithId } = await productApiRequest.getProductById({
    productId: productId,
  });
  const model = productWithId.variations.find((variation) => variation.skuId === skuId);
  if (!model) return null;

  return (
    <div key={productWithId.productName} className="w-full h-full">
      <div className="flex flex-row mb-1 p-2 bg-white items-center rounded-xl">
        <Checkbox />
        <div className="w-[160px] h-[160px]">
          <Image
            src={model?.image?.url ?? productWithId?.images[0]?.url ?? ''}
            alt={productWithId.productName}
            width={400}
            height={400}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
        <div className="flex flex-row justify-between w-[443px] items-center">
          <div className="flex flex-col ml-4">
            <span className="text-lg font-semibold">
              {productWithId.productName + ' ' + getVariationString(model.attributes)}
            </span>

            <span className="my-2 text-[#ee4949] text-lg font-semibold">
              {currencyFormat(model.price.special)}đ
              <span className="ml-2 text-slate-500 text-base line-through">
                {currencyFormat(model.price.base)}đ
              </span>
            </span>
          </div>

          <UpdateProductCart products={products} index={index} />
        </div>
      </div>
    </div>
  );
}
