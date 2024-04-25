import { useAddressModal } from '@/hooks/useAddressModal';
import { UserAddressResponseDto } from '@techcell/node-sdk';
import { Collapsible, CollapsibleContent } from '@radix-ui/react-collapsible';
import { CollapsibleTrigger } from '../ui/collapsible';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ADDRESS_TYPES } from '@/constants';
import { buildAddressString } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AddressListProps {
  list: UserAddressResponseDto[];
  onOpenUpdateModal: (index: number) => void;
}
const AddressOrder = ({ list, onOpenUpdateModal }: Readonly<AddressListProps>) => {
  const { onOpen, setAddressIndex } = useAddressModal();
  const [openSetDefault, setOpenSetDefault] = useState<boolean>(true);
  

  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);
  // const findAddress = list.includes(element.isDefault = true);
  return (
    <div className="w-[auto] sm:w-[640px] h-auto m-auto bg-white my-3 p-4">
      <RadioGroup
        className="w-full flex flex-col"
        defaultValue="0"
        onValueChange={(value) => setSelectedAddressIndex(Number(value))}
      >
        <div className="text-center">
          <div className="text-[18px] font-bold py-2">Địa chỉ khách hàng</div>
          <div className="flex sm:justify-end mr-2">
            <Button
              variant="ghost"
              className="w-fit text-base text-primary underline hover:text-primary-dark hover:bg-none px-2 py-4 border-[1px] border-solid border-[#ee4949] rounded-md cursor-pointer"
              disabled={list[selectedAddressIndex].isDefault}
              onClick={() => setOpenSetDefault(true)}
            >
              Đặt làm mặc định
            </Button>
          </div>
          <Collapsible>
            {list.slice(0, 1).map((address, index) => (
              <CollapsibleTrigger key={index} className="w-full my-4">
                <div className="w-full flex justify-between items-center">
                  <div className="w-full flex items-center">
                    <div className='w-[10%]'>
                      <RadioGroupItem
                        value={index.toString()}
                        id={index.toString()}
                        className="w-5 h-5 mr-5"
                      />
                    </div>
                    <div className='w-[80%]'>
                      <div className="flex justify-between items-center">
                        <div className='text-sm sm:text-base'>{address.customerName}</div>
                        <div className="flex gap-2.5">
                          <p className="text-zinc-500 font-normal text-sm sm:text-base">{address.phoneNumbers}</p>
                          {address.isDefault && <Badge className="bg-primary">Mặc định</Badge>}
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-zinc-500 text-sm">
                          {ADDRESS_TYPES.get(address.type)?.typeValue}
                        </p>
                        <div className="flex items-center w-full">
                          <p className="text-zinc-500 truncate">{buildAddressString(address)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChevronRight />
                </div>
              </CollapsibleTrigger>
            ))}

            {/* {list.slice(1).map((address, index) => (
              <CollapsibleContent key={index} className="w-full px-4 my-4">
                <div className="w-full flex justify-between items-center">
                  <div>
                    <div className="flex justify-between items-center">
                      <div>{address.customerName}</div>
                      <div className="flex gap-2.5">
                        <p className="text-zinc-500 font-normal">{address.phoneNumbers}</p>
                        {address.isDefault && <Badge className="bg-primary">Mặc định</Badge>}
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-zinc-500 text-sm">
                        {ADDRESS_TYPES.get(address.type)?.typeValue}
                      </p>
                      <div className="flex items-center w-full">
                        <p className="text-zinc-500 truncate">{buildAddressString(address)}</p>
                      </div>
                    </div>
                  </div>
                  <ChevronRight />
                </div>
              </CollapsibleContent>
            ))} */}
          </Collapsible>
        </div>
      </RadioGroup>
    </div>
  );
};

export default AddressOrder;
