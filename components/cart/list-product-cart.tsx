'use client';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { ProductCart } from '@/types/cart.type';

import TableCartDetails from './table-cart-detail';

export type ListProductCartProps = {
  products: ProductCart[];
};

export default function ListProductCart({ products }: Readonly<ListProductCartProps>) {
  return (
    <div className="">
      <Table>
        <TableHeader className="hidden sm:contents">
          <TableRow className="">
            <TableHead className="font-bold text-center">Hình ảnh </TableHead>
            <TableHead className="font-medium text-center">Tên</TableHead>
            <TableHead className="font-medium text-center">Giá</TableHead>
            <TableHead className="font-medium text-center">Số lượng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {products.map((product) => (
            <TableRow
              key={product.variation?.skuId}
              className="flex flex-wrap justify-end items-center sm:table-row"
            >
              <TableCartDetails product={product} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
