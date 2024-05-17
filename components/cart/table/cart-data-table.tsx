'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { CartColumnItem, VariationInColumnCart, columns } from './columns';
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, scrollToTop } from '@/lib/utils';
import { useDebounceFn, useUpdateEffect } from 'ahooks';

import ButtonCart from '../button-cart';
import { CartTablePagination } from './cart-table-pagination';
import { UserAddressList } from '@/components/profile/address-list';
import { useAppContext } from '@/providers/app-provider';
import { useAddressModal } from '@/hooks/useAddressModal';
import { RootPath } from '@/constants/enum';
import { orderApiRequest } from '@/apiRequests';
import { PreviewOrderDtoPaymentMethodEnum } from '@techcell/node-sdk';
import { useOrderPreviewStore } from '@/providers/order-preview-store-provider';
import { toast } from '@/components/ui/use-toast';

interface CartDataTableProps {
  data: CartColumnItem[];
}

export const CartDataTable = ({ data }: Readonly<CartDataTableProps>) => {
  const { push } = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  const [showUncheckMsg, setShowUncheckMsg] = useState<boolean>(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useAppContext();
  const { onOpen, setAddressIndex } = useAddressModal();
  const { setPreviewData, setIsBuyFromCart, setAddressIndex: setStoredAddressIndex } = useOrderPreviewStore((state) => state);

  const table = useReactTable({
    data,
    columns: columns,
    state: {
      sorting,
      rowSelection,
      // columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useUpdateEffect(() => {
    if (Object.entries(rowSelection).length === 0) {
      setSelectedVariations([]);
      return;
    }
    setSelectedVariations(
      table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.getValue<VariationInColumnCart>('variation').skuId),
    );
    setShowUncheckMsg(false);
  }, [rowSelection]);

  const { run } = useDebounceFn(async () => {
    try {
      const matchedProduct = data.filter((product) =>
        selectedVariations.includes(product.variation.skuId),
      );

      const { payload } = await orderApiRequest.previewOrder({
        products: matchedProduct.map((product) => {
          return {
            skuId: product.variation.skuId,
            quantity: product.quantity,
          };
        }),
        addressIndex: selectedAddressIndex as number,
        paymentMethod: PreviewOrderDtoPaymentMethodEnum.Cod,
      });

      setPreviewData(payload);
      setStoredAddressIndex(selectedAddressIndex as number);
      setIsBuyFromCart();
  
      const productsToPreview = matchedProduct.map((product) => {
        return `${product.variation.skuId}-${product.quantity}`;
      });
  
      localStorage.setItem(
        'selected-sku',
        productsToPreview.toString() + '/' + selectedAddressIndex?.toString(),
      );
      push(RootPath.Payment);
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Có lỗi xảy ra. Đặt hàng thất bại...',
      })
    } finally {
      setIsLoading(false);
    }
  }, {
    wait: 1000,
  });

  const totalPrice = useMemo(() => {
    if (selectedVariations.length === 0) {
      return 0;
    }

    let total = 0;
    data.forEach((product) => {
      if (selectedVariations.includes(product.variation.skuId)) {
        total +=
          (product.price.special !== 0 ? product.price.special : product.price.base) *
          product.quantity;
      }
    });

    return total;
  }, [data, selectedVariations]);

  const handleOpenAddNewAddress = () => {
    setAddressIndex(null);
    onOpen();
  };

  const handleOpenUpdateAddress = (index: number) => {
    setAddressIndex(index);
    onOpen();
  };

  const handleClicKCheckout = () => {
    if (selectedVariations.length === 0) {
      setShowUncheckMsg(true);
      scrollToTop();
      return;
    }
    setIsLoading(true);
    run();
  };

  return (
    <>
      <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-2/3 h-auto ">
        <div className="flex flex-col gap-4">
          <div className="p-4 w-full bg-white rounded-md h-auto">
            {showUncheckMsg && (
              <h4 className="text-primary text-base sm:text-lg text-center mb-4">
                Cần chọn ít nhất 1 sản phẩm trước khi thanh toán!
              </h4>
            )}
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={cn(
                          'text-center',
                          header.id === 'variation' || 'id' ? 'p-0' : '',
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            'text-center justify-center',
                            cell.id === 'variation' || 'id' ? 'p-0' : '',
                          )}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="w-full mt-4 sm:px-2">
              <CartTablePagination table={table} />
            </div>
          </div>
          <div className="p-4 w-full bg-white rounded-md h-auto">
            <div className="w-full sm:px-2">
              <h4 className="font-semibold text-xl">Chọn địa chỉ</h4>
              <UserAddressList
                list={user?.address || []}
                onOpenUpdateModal={handleOpenUpdateAddress}
                currentIndex={selectedAddressIndex}
                onSelectIndex={setSelectedAddressIndex}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 h-[100px] sm:sticky sm:top-20">
        <ButtonCart
          totalPrice={totalPrice}
          handleClick={handleClicKCheckout}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
