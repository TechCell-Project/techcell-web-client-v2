'use client';

import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header';

import { AttributeInProductDto, PriceDto } from '@techcell/node-sdk';
import { currencyFormat, getVariationString } from '@/utilities/func.util';
import UpdateProductCart from '../update-product-cart';

export type VariationInColumnCart = {
  skuId: string;
  attributes: AttributeInProductDto[];
};

export type CartColumnItem = {
  id: string;
  variation: VariationInColumnCart;
  thumbnail: string;
  name: string;
  price: PriceDto;
  quantity: number;
};

export const columns: ColumnDef<CartColumnItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Chọn tất cả"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Chọn sản phẩm"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => null,
    cell: ({ row }) => null,
    enableSorting: false,
  },
  {
    accessorKey: 'variation',
    header: ({ column }) => null,
    cell: ({ row }) => null,
    enableSorting: false,
  },
  {
    accessorKey: 'thumbnail',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ảnh" />,
    cell: ({ row }) => (
      <div className="w-full h-24 flex items-center justify-center">
        <Image
          src={row.getValue('thumbnail')}
          alt={row.getValue('name')}
          width={400}
          height={400}
          className="h-[80px] w-auto max-w-[80px] object-cover object-center"
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên" />,
    cell: ({ row }) => {
      const attributes = row.getValue<VariationInColumnCart>('variation').attributes;
      return (
        <div className="max-w-72 flex flex-col items-center justify-center text-base">
          <p className="font-semibold">{row.getValue('name')}</p>
          <p>{getVariationString(attributes)}</p>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Giá" className='justify-center' />,
    cell: ({ row }) => {
      const price = row.getValue<PriceDto>('price');
      const thisPrice = price.special !== 0 ? price.special : price.base;
      const thisQuantity = row.getValue<number>('quantity');

      return (
        <div className="max-w-60 flex flex-col items-center justify-center">
          <p className="text-base text-primary">{currencyFormat(thisPrice * thisQuantity)}</p>
          <span className="text-slate-500 text-sm line-through">
            {price.special !== 0 && currencyFormat(price.base * thisQuantity)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Số lượng" />,
    cell: ({ row }) => (
      <div className="flex items-center">
        <UpdateProductCart
          product={{
            productId: row.getValue('id'),
            skuId: row.getValue<VariationInColumnCart>('variation').skuId,
            quantity: row.getValue('quantity'),
          }}
        />
      </div>
    ),
    enableSorting: false,
  },
];
