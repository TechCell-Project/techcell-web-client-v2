'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  CreateOrderDto,
  CreateOrderDtoPaymentMethodEnum,
  PreviewOrderResponseDto,
} from '@techcell/node-sdk';

import { useAddressModal } from '@/hooks/useAddressModal';
import { orderApiRequest } from '@/apiRequests';

import { Button } from '@/components/ui/button';
import { UserAddressList } from '@/components/profile/address-list';
import { BackButton } from '@/components/common/button-back';
import PaymentMethodList from './payment_method_list';
import { OrderListProduct } from './order-list-product';
import { ShippingAddressInfo } from './shipping-info-order';
import { currencyFormat } from '@/utilities/func.util';

import { useForm } from 'react-hook-form';
import { PaymentFormType, PaymentSchema } from '@/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { InputText } from '@/components/common/form/input-text';
import { toast } from '@/components/ui/use-toast';
import { RootPath } from '@/constants';
import { Icons } from '@/components/icons';
import { useAppContext } from '@/providers/app-provider';
import { useOrderPreviewStore } from '@/providers/order-preview-store-provider';

interface OrderPreviewProps {
  previewData: PreviewOrderResponseDto;
}
const OrderPreview = ({ previewData }: OrderPreviewProps) => {
  const { push, refresh } = useRouter();
  const { onOpen, setAddressIndex } = useAddressModal();
  const { user } = useAppContext();
  const { addressIndex, setAddressIndex: setStoreAddressIndex } = useOrderPreviewStore(
    (state) => state,
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<CreateOrderDtoPaymentMethodEnum>(CreateOrderDtoPaymentMethodEnum.Cod);

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
    try {
      const payload: CreateOrderDto = {
        ...values,
        products: previewData.products.map((product) => {
          return {
            skuId: product.skuId,
            quantity: product.quantity,
          };
        }),
        addressIndex: addressIndex,
        paymentMethod: CreateOrderDtoPaymentMethodEnum.Vnpay,
        isSelectFromCart: true,
        paymentReturnUrl: 'https://techcell.cloud',
      };

      const { payload: order } = await orderApiRequest.createOrder(payload);

      console.log(order);

      if (order.payment.url) {
        window.location.replace(order.payment.url);
      }

      toast({
        variant: 'success',
        title: 'Đặt hàng thành công',
      });

      refresh();
      if (selectedPaymentMethod === CreateOrderDtoPaymentMethodEnum.Cod) {
        push(RootPath.Cart);
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Thanh toán thất bại',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-5 pb-5 w-full h-fit sm:container sm:max-w-[640px] lg:max-w-[768px] bg-white mb-5 rounded-md">
      <div className="w-full text-center flex items-center px-4 py-2">
        <BackButton />
        <div className="w-full">
          <div className="text-xl font-bold text-center">Thông tin</div>
        </div>
      </div>

      <Suspense>
        <div className="w-full flex flex-col items-center gap-4 my-5">
          <h4 className="font-semibold text-xl">Thay đổi địa chỉ</h4>
          <UserAddressList
            list={user?.address || []}
            onOpenUpdateModal={handleOpenUpdateAddress}
            currentIndex={addressIndex}
            onSelectIndex={setStoreAddressIndex}
          />
        </div>
      </Suspense>

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
          <div className="w-full flex flex-col gap-5">
            <div className="w-full flex justify-between">
              <div className="text-[18px] font-bold">Tổng tiền tạm tính : </div>
              <div className="text-primary font-bold">{currencyFormat(previewData.totalPrice)}</div>
            </div>
            <Button className="w-full text-lg" type="submit" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />}
              Đặt hàng
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OrderPreview;
