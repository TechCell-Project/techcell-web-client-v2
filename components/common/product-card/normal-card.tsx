import Image from 'next/image';

import { calculateSaleOffPercentage, currencyFormat } from '@/utilities/func.util';
import { ProductInListDto } from '@techcell/node-sdk';
import { BuyingButton } from './normal-card-button';

import TempProductImg from '@/public/phone-test/15-base.jpg';
import Link from 'next/link';
import { RootPath } from '@/constants';

export const NormalCard = ({ product }: { product: ProductInListDto}) => {
  return (
    <div
      key={product.id}
      className="w-full min-w-[200px] max-w-[280px] flex flex-col bg-white p-2 justify-center rounded-xl hover:scale-[101%] hover:transition duration-150 ease-in-out"
    >
      <Link href={`${RootPath.ProductDetails}/${product.id}`}>
      <div className="w-[180px] h-[180px] m-auto flex items-center">
        <Image
          src={TempProductImg.src}
          alt={product.name}
          width={180}
          height={180}
          className="w-full h-auto max-h-[180px] object-cover object-center"
          />
      </div>
          </Link>
      <span className="font-bold text-sm pt-4">{product.modelName}</span>
      <span className="font-bold text-lg my-2 text-primary font-semiblod">
        {currencyFormat(product.price.special !== 0 ? product.price.special : product.price.base)}
        <sup>đ</sup>
        {product.price.special !== 0 && (
          <span className="ml-2 text-slate-500 text-base line-through">
            {currencyFormat(Number(product.price.base))}
            <sup>đ</sup>
          </span>
        )}
      </span>

      {product.price.special !== 0 && (
        <div className="text-xs p-2 rounded-md border border-solid border-slate-[#e5e7eb] bg-[#f3f4f6]">
          Giảm giá đến :{' '}
          <span className="text-sm text-primary font-bold">
            {calculateSaleOffPercentage(product.price.base, product.price.special)} %
          </span>{' '}
          và nhiều khuyến mại hấp dẫn khác
        </div>
      )}
      <BuyingButton productId={product.id} />
    </div>
  );
};
