import { buildAddressString } from '@/lib/utils';
import { CustomerSchema } from '@techcell/node-sdk';

interface ShippingInfoProps {
  info: CustomerSchema;
}

export const ShippingAddressInfo = ({ info }: Readonly<ShippingInfoProps>) => {
  return (
    <div className="w-auto sm:w-full h-auto m-auto bg-white">
      <div className=" rounded-md my-3 py-2">
        <div className="mt-[0] mb-[15px] flex flex-col gap-5">
          <div className="text-center">
            <div className="text-[20px] font-bold">Thông tin nhận hàng</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-[#7c8691] flex-shrink-0 text-[15px] font-normal">Khách hàng</div>
            <div className="text-[#111] text-[15px]">{info.address.customerName}</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-[#7c8691] flex-shrink-0 text-[15px] font-normal">
              Số điện thoại
            </div>
            <div className="text-[#111] text-[15px]">{info.address.phoneNumbers}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-[#7c8691] flex-shrink-0 text-[15px] font-normal">
              Nhận hàng tại
            </div>
            <div className="text-[#111] text-[15px] text-right">{buildAddressString(info.address)}</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-[#7c8691] flex-shrink-0 text-[15px] font-normal">Ghi chú</div>
            <div className="text-[#111] text-[15px]">{info.address.detail}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
