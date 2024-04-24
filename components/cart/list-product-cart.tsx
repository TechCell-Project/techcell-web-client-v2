'use client';

import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Cart } from '@techcell/node-sdk';
import ProductCart from './product-cart';

export type ListProductCartProps = {
  products: Cart['products'];
};

export default function ListProductCart({ products }: ListProductCartProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center mb-2 p-2">
        <Checkbox />
        <p className="ml-2 text-lg">Chọn tất cả</p>
      </div>

      {products &&
        products?.map((product, index) => (
          <ProductCart products={products} index={index} key={product.skuId} />
        ))}

      <div className="flex flex justify-between items-center bg-white h-[100px] p-2 rounded-xl">
        <span className="text-lg">Tạm tính:</span>
        <Button>
          <span>Thanh toán</span>
        </Button>
      </div>
    </div>
  );
}
