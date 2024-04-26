'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  CreateOrderDto,
  CreateOrderDtoPaymentMethodEnum,
  PreviewOrderResponseDto,
  UserAddressResponseDto,
} from '@techcell/node-sdk';

import { useAddressModal } from '@/hooks/useAddressModal';
import { authApiRequest, orderApiRequest } from '@/apiRequests';

import { Button } from '@/components/ui/button';
import { UserAddressList } from '@/components/profile/address-list';
import { BackButton } from '@/components/common/button-back';
import PaymentMethodList from './payment_method_list';
import OrderListProduct from './order-list-product';
import { ShippingAddressInfo } from './shipping-info-order';
import { currencyFormat } from '@/utilities/func.util';

import useUpdateEffect from 'ahooks/lib/useUpdateEffect';

import { useForm } from 'react-hook-form';
import { PaymentFormType, PaymentSchema } from '@/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { InputText } from '@/components/common/form/input-text';
import { toast } from '../ui/use-toast';
import { RootPath } from '@/constants';

interface OrderPreviewProps {
  previewData: PreviewOrderResponseDto;
}
const OrderPreview = ({ previewData }: OrderPreviewProps) => {
  const { push, refresh } = useRouter();
  const { onOpen, setAddressIndex } = useAddressModal();
  const [addressList, setAddressList] = useState<UserAddressResponseDto[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | undefined>(undefined);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<CreateOrderDtoPaymentMethodEnum>(CreateOrderDtoPaymentMethodEnum.Cod);

  useEffect(() => {
    const getAddressList = async () => {
      const { payload } = await authApiRequest.getMeClient();

      if (payload.address) {
        setAddressList(payload.address);
      }
    };

    getAddressList();
  }, []);

  useUpdateEffect(() => {
    if (addressList.length > 0) {
      setSelectedAddressIndex(addressList.findIndex((address) => address.isDefault));
    }
  }, [addressList]);

  const handleOpenUpdateAddress = (index: number) => {
    setAddressIndex(index);
    onOpen();
  };

  const form = useForm<PaymentFormType>({
    mode: 'onChange',
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      orderNote: 'Không có',
      shipNote: 'Không có',
      // paymentMethod: 'COD',
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = form;

  const onSubmit = async (values: PaymentFormType) => {
    if (!selectedAddressIndex) {
      toast({
        variant: 'destructive',
        title: 'Vui lòng chọn địa chỉ',
      });
      return;
    }
    try {
      const payload: CreateOrderDto = {
        ...values,
        products: previewData.products.map((product) => {
          return {
            skuId: product.skuId,
            quantity: product.quantity,
          };
        }),
        addressIndex: selectedAddressIndex,
        paymentMethod: CreateOrderDtoPaymentMethodEnum.Vnpay,
        isSelectFromCart: true,
        paymentReturnUrl: 'http://localhost:3000',
      };

      await orderApiRequest.createOrder(payload);

      localStorage.removeItem('selected-sku');
      toast({
        variant: 'success',
        title: 'Đặt hàng thành công',
      });

      refresh();
      push(RootPath.Cart);
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Thanh toán thất bại',
      });
    }
  };

  return (
    <div className="px-5 w-full h-fit sm:container sm:max-w-[640px] lg:max-w-[768px] bg-white mb-5 rounded-md">
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
          currentIndex={selectedAddressIndex}
          onSelectIndex={setSelectedAddressIndex}
        />
      </div>

      <OrderListProduct products={previewData.products} />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <InputText<PaymentFormType>
            name="orderNote"
            label="Ghi chú đơn hàng"
            form={form}
            disabled={isSubmitting}
            isTextArea={true}
          />
          <PaymentMethodList />
          <ShippingAddressInfo info={previewData.customer} />
          <InputText<PaymentFormType>
            name="shipNote"
            label="Ghi chú giao hàng"
            form={form}
            disabled={isSubmitting}
            isTextArea={true}
          />
          <div className="w-full flex justify-between">
            <div className="text-[18px] font-bold">Tổng tiền tạm tính : </div>
            <div className="text-primary font-bold">{currencyFormat(previewData.totalPrice)}</div>
          </div>
          <Button className="w-full text-lg" type="submit">
            Đặt hàng
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OrderPreview;
