'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { MdOutlineAddShoppingCart, MdLocalShipping } from 'react-icons/md';

import { cartApiRequest } from '@/apiRequests/cart';
import { CircleX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Modal } from '@/components/ui/modal';
import { DialogFooter } from '@/components/ui/dialog';
import { useAppContext } from '@/providers/app-provider';
import { RootPath } from '@/constants';
import { useAddressModal } from '@/hooks/useAddressModal';

interface BuyingButtonProps {
  productId: string;
  skuId: string | null;
}

export const BuyingButtonGroup = ({ productId, skuId }: BuyingButtonProps) => {
  const pathname = usePathname();
  const { refresh, push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAppContext();
  const [open, setOpen] = useState<{ title: string; isOpen: boolean }>({
    title: '',
    isOpen: false,
  });
  const { onOpen, setAddressIndex } = useAddressModal();

  const handleAddAddress = () => {
    setAddressIndex(null);
    onOpen();
  };

  const handleBuyNow = async () => {
    if (!user) {
      push(`${RootPath.Login}?callbackUrl=${pathname}`);
      return;
    }

    if (!user.address) {
      handleAddAddress();
      return;
    }

    setIsLoading(true);

    localStorage.setItem(
      'selected-buy-now',
      skuId + '-1' + '/' + user.address.findIndex((address) => address.isDefault),
    );

    push(`${RootPath.Payment}?buy-now=true`);

    setIsLoading(false);
  };

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
      refresh();
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
      <Button
        variant="default"
        className="w-1/2 sm:w-3/5 text-white"
        disabled={isLoading}
        onClick={handleBuyNow}
      >
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
