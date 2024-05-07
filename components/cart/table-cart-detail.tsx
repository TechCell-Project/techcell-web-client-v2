import { TableCell } from '@/components/ui/table';
import { ProductCart } from '@/types/cart.type';
import Image from 'next/image';
import AlternativeImg from '@/public/phone-test/15-promax.jpg';
import { currencyFormat, getVariationString } from '@/utilities/func.util';
import UpdateProductCart from './update-product-cart';

export type ProductCartProps = {
  product: ProductCart;
};

const TableCartDetails = ({ product }: Readonly<ProductCartProps>) => {
  return (
    <>
      <TableCell className="max-w-[120px] w-full h-[120px] flex flex-col items-center">
        <Image
          src={product.variation.image ? product.variation.image.url : AlternativeImg.src}
          alt={product.productName}
          width={400}
          height={400}
          className="h-[120px] w-[120px] object-cover object-center"
        />
      </TableCell>
      <TableCell className='my-1'>
        <div className="sm:text-sm font-semibold">{product.productName}</div>
        <div>{getVariationString(product.variation.attributes)}</div>
      </TableCell>
      <TableCell className="my-2 text-primary text-sm sm:text-base font-semibold text-center">
        <div>
          {currencyFormat(
            (product.variation.price.special !== 0
              ? product.variation.price.special
              : product.variation.price.base) * product.quantity,
          )}
          đ
        </div>
        {product.variation.price.special !== 0 && (
          <div className="text-slate-500 text-sm line-through">
            {currencyFormat(product.variation.price.base * product.quantity)}đ
          </div>
        )}
      </TableCell>
      <TableCell className="">
        <UpdateProductCart
          product={{
            productId: product.productId,
            skuId: product.variation.skuId,
            quantity: product.quantity,
          }}
        />
      </TableCell>
    </>
  );
};

export default TableCartDetails;
