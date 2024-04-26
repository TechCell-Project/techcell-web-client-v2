'use client';

import { useEffect, useState } from 'react';

import { PreviewOrderResponseDto, UserAddressResponseDto } from '@techcell/node-sdk';

import { useAddressModal } from '@/hooks/useAddressModal';
import { authApiRequest } from '@/apiRequests';

import { Button } from '@/components/ui/button';
import { UserAddressList } from '@/components/profile/address-list';
import { BackButton } from '@/components/common/button-back';
import PaymentMethodList from './payment_method_list';
import OrderListProduct from './order-list-product';
import { ShippingAddressInfo } from './shipping-info-order';

interface OrderPreviewProps {
  previewData: PreviewOrderResponseDto;
}
const OrderPreview = ({ previewData }: OrderPreviewProps) => {
  const { onOpen, setAddressIndex } = useAddressModal();
  const [addressList, setAddressList] = useState<UserAddressResponseDto[]>([]);

  useEffect(() => {
    const getAddressList = async () => {
      const { payload } = await authApiRequest.getMeClient();

      if (payload.address) {
        setAddressList(payload.address);
      }
    };

    getAddressList();
  }, []);

  const handleOpenUpdateAddress = (index: number) => {
    setAddressIndex(index);
    onOpen();
  };

  return (
    <div className="px-5 w-full h-fit sm:container sm:max-w-[640px] lg:max-w-[768px] bg-white mb-5">
      <div className="w-full text-center flex items-center px-4 py-2">
        <BackButton />
        <div className="text-center">
          <div className="ml-[120px] sm:ml-[220px] text-xl font-bold">Thông tin</div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4 my-5">
        <h4 className="font-semibold text-xl">Thay đổi địa chỉ</h4>
        <UserAddressList
          list={addressList}
          onOpenUpdateModal={handleOpenUpdateAddress}
          currentIndex={addressList.findIndex((address) => address.isDefault)}
        />
      </div>

      <OrderListProduct />
      <PaymentMethodList />
      <ShippingAddressInfo info={previewData.customer} />

      <div className="w-full flex justify-between">
        <div className="text-[18px] font-bold">Tổng tiền tạm tính : </div>
        <div className="text-primary font-bold">{previewData.totalPrice}</div>
      </div>
      <div className="py-2">
        <Button className="w-full text-lg ">Đặt hàng</Button>
      </div>
    </div>
  );
};

export default OrderPreview;
