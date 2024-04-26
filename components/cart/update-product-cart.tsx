'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';
import { ProductCartProps } from './card-product-cart';
import { useDebounceFn } from 'ahooks';
import { cartApiRequest } from '@/apiRequests/cart';
import { useRouter } from 'next/navigation';
import { ProductCartSchema } from '@techcell/node-sdk';
import { toast } from '@/components/ui/use-toast';
import { Modal } from '@/components/ui/modal';
import { DialogFooter } from '../ui/dialog';

interface UpdateProductCartProps {
  product: ProductCartSchema;
}

export default function UpdateProductCart({ product }: Readonly<UpdateProductCartProps>) {
  const { refresh } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const handleUpdateQuantity = async (quantityUpdate: number) => {
    if (product.quantity === 1 && quantityUpdate === -1) return;
    setIsLoading(true);
    try {
      await cartApiRequest.updateCartClient({
        products: [
          {
            productId: product.productId,
            skuId: product.skuId,
            quantity: quantityUpdate,
          },
        ],
      });
      refresh();
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Cập nhật số lượng thất bại',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    setIsLoading(true);
    try {
      await cartApiRequest.updateCartClient({
        products: [
          {
            productId: product.productId,
            skuId: product.skuId,
            quantity: 0,
          },
        ],
      });
      toast({
        variant: 'success',
        title: 'Đã xóa sản phẩm',
      });
      refresh();
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Xóa sản phẩm thất bại',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-row items-center sm:flex-row gap-3 justify-between sm:justify-center">
      <div className="flex flex-row">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleUpdateQuantity(-1)}
          disabled={product.quantity === 1 || isLoading}
          className="h-[30px] w-[40px]"
        >
          <Minus />
        </Button>
        <span className="mx-4 text-lg sm:text-lg">{product.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleUpdateQuantity(1)}
          disabled={isLoading}
          className="h-[30px] w-[40px]"
        >
          <Plus />
        </Button>
      </div>
      <Button variant="destructive" onClick={() => setOpenDelete(true)} className="cursor-pointer px-2 py-1 sm:p-2 sm:mr-2.5">
        <Trash2 />
      </Button>
      <Modal
        title="Xác nhận xóa sản phẩm này khỏi giỏ hàng?"
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <DialogFooter className='mt-5'>
          <Button variant="default" onClick={handleDeleteProduct} disabled={isLoading}>
            Xác nhận
          </Button>
          <Button variant="secondary" onClick={() => setOpenDelete(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </Modal>
    </div>
  );
}
