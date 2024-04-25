import { buildAddressString } from '@/lib/utils';
import { UserAddressResponseDto } from '@techcell/node-sdk';

interface AddressListProps {
  list: UserAddressResponseDto[];
}

const ShippingInfo = ({ list }: Readonly<AddressListProps>) => {
  return (
    <div className="w-auto sm:w-[640px] h-auto m-auto bg-white">
      <div className=" rounded-md my-3 py-2">
        <div className="mt-[0] mx-[15px] mb-[15px] flex flex-col gap-5">
          <div className="text-center">
            <div className="text-[20px] font-bold">Thông tin nhận hàng</div>
          </div>
          {list.slice(0,1).map((address, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <div className="text-[#7c8691] flex-shrink-0 text-[15px] font-normal">
                  Khách hàng
                </div>
                <div className="text-[#111] text-[15px]">{address.customerName}</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-[#7c8691] flex-shrink-0 text-[15px] font-normal">
                  Số điện thoại
                </div>
                <div className="text-[#111] text-[15px]">{address.phoneNumbers}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-[#7c8691] flex-shrink-0 text-[15px] font-normal">
                  Nhận hàng tại
                </div>
                <div className="text-[#111] text-[15px] text-right">{buildAddressString(address)}</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-[#7c8691] flex-shrink-0 text-[15px] font-normal">Ghi chú</div>
                <div className="text-[#111] text-[15px]">{address.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
