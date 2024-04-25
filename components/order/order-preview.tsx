'use client';
import { ArrowLeft } from 'lucide-react';
import OrderListProduct from './order-list-product';
import ShippingInfo from './shipping-info-order';
import { Button } from '../ui/button';
import AddressOrder from './address-order';
import { GetMeResponseDto } from '@techcell/node-sdk';
import { useAddressModal } from '@/hooks/useAddressModal';
import PaymentMethodList from './payment_method_list';

interface ProfileProps {
  profile: GetMeResponseDto;
}
const OrderPreview = ({ profile }: ProfileProps) => {
  const { onOpen, setAddressIndex } = useAddressModal();

  const handleOpenUpdateAddress = (index: number) => {
    setAddressIndex(index);
    onOpen();
  };

  console.log(profile);
  return (
    <>
      <div className="w-[auto] sm:w-[640px] h-auto m-auto bg-white">
        <div className="w-full text-center flex items-center px-4 py-2">
          <ArrowLeft />
          <div className="text-center">
            <div className="ml-[120px] sm:ml-[220px] text-xl font-bold">Thông tin</div>
          </div>
        </div>
      </div>

      {profile?.address && (
        <AddressOrder list={profile.address} onOpenUpdateModal={handleOpenUpdateAddress} />
      )}
      <OrderListProduct />
      <PaymentMethodList />
      {profile?.address && <ShippingInfo list={profile.address} />}

      <div className="w-[auto] sm:w-[640px] h-auto m-auto bg-white p-4 sm:py-2 sm:px-1 ">
        <div className="flex justify-between">
          <div className="text-[18px] font-bold">Tổng tiền tạm tính : </div>
          <div className="text-[#ee4949] font-bold">240000000 đ</div>
        </div>
        <div className="py-2">
          <Button className="w-full text-lg ">Đặt hàng</Button>
        </div>
      </div>
    </>
  );
};

export default OrderPreview;
