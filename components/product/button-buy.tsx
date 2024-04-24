'use client';

import { useState } from 'react';

import { MdOutlineAddShoppingCart, MdLocalShipping } from 'react-icons/md';

import { cartApiRequest } from '@/apiRequests/cart';
import { CircleX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Modal } from '@/components/ui/modal';
import { DialogFooter } from '@/components/ui/dialog';

interface BuyingButtonProps {
  productId: string;
  skuId: string | null;
}

export const BuyingButtonGroup = ({ productId, skuId }: BuyingButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<{ title: string; isOpen: boolean }>({
    title: '',
    isOpen: false,
  });

  const handleAddtoCart = async () => {
    setIsLoading(true);
    try {
      if (!skuId) {
        setOpen({
          title: 'Thêm vào giỏ hàng thất bại',
          isOpen: true,
        });
        return;
      }

      await cartApiRequest.addToCartClient({
        products: [
          {
            productId,
            skuId,
            quantity: 1,
          },
        ],
      });

      toast({
        variant: 'success',
        title: 'Thêm vào giỏ hàng thành công',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Thêm vào giỏ hàng thất bại',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen({
      title: '',
      isOpen: false,
    });
  };

  return (
    <div className="flex gap-2.5 w-full h-14 p-[1px]">
      <Button
        variant="outline"
        disabled={isLoading}
        className="w-1/2 sm:w-2/5 border text-primary hover:border-2 hover:border-primary hover:text-primary"
        onClick={handleAddtoCart}
      >
        <MdOutlineAddShoppingCart />
        Thêm giỏ hàng
      </Button>
      <Button variant="default" className="w-1/2 sm:w-3/5 text-white" disabled={isLoading}>
        <MdLocalShipping />
        Mua ngay
      </Button>

      <Modal title={open.title} isOpen={open.isOpen} onClose={handleClose}>
        <div className="w-full flex flex-col items-center gap-3">
          <CircleX className="w-20 h-auto text-primary" />
          <p className="text-base">Bạn chưa chọn đủ các thuộc tính</p>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </DialogFooter>
      </Modal>
    </div>
  );
};
