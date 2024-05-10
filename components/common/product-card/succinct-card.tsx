import Image from 'next/image';

import { calculateSaleOffPercentage, currencyFormat } from '@/utilities/func.util';
import { ProductInListDto } from '@techcell/node-sdk';
import TempProductImg from '@/public/phone-test/15-base.jpg';
import Link from 'next/link';
import { RootPath } from '@/constants';

export const SuccinctCard = ({ product }: { product: ProductInListDto }) => {
    return (
        <div
            key={product.id}
            className="w-full min-w-[220px] max-w-[340px] flex flex-col bg-white p-3 justify-center rounded-xl hover:transition duration-150 ease-in-out"
        >
            <Link href={`${RootPath.ProductDetails}/${product.id}`}>
                <div className="sm:w-[200px] sm:h-[200px] md:w-[200px] md:h-[200px] lg:w-[230px] lg:h-[230px] m-auto flex items-center">
                    <Image
                        src={product.images[0]?.url || TempProductImg.src}
                        alt={product.modelName}
                        width={230}
                        height={230}
                        className="w-full h-auto sm:max-h-[200px] md:max-h-[200px] lg:max-h-[230px] object-cover object-center"
                    />
                </div>
            </Link>
            <span className="font-bold pt-7 sm:text-base md:text-bases lg:text-lg">{product.modelName}</span>
            <span className="font-bold sm:text-sm md:text-sm lg:text-base my-3 text-primary font-semiblod">
                {currencyFormat(product.price.special !== 0 ? product.price.special : product.price.base)}
                <sup>đ</sup>
                {product.price.special !== 0 && (
                    <span className="ml-2 text-slate-500 sm:text-sm md:text-sm lg:text-base line-through">
                        {currencyFormat(Number(product.price.base))}
                        <sup>đ</sup>
                    </span>
                )}
                {product.price.special !== 0 && (
                    <span className="ml-2 text-slate-500 sm:text-xs md:text-xs lg:text-sm">
                        -{calculateSaleOffPercentage(product.price.base, product.price.special)} %
                    </span>
                )}
            </span>
        </div>
    );
};
