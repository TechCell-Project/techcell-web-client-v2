'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserAddressResponseDto } from '@techcell/node-sdk';
import { buildAddressString } from '@/lib/utils';
import { ADDRESS_TYPES } from '@/constants';
import { Trash } from 'lucide-react';

interface AddressListProps {
  list: UserAddressResponseDto[];
  onOpenUpdateModal: (index: number) => void;
}

export function UserAddressList({ list, onOpenUpdateModal }: Readonly<AddressListProps>) {
  return (
    <div className="w-full">
      {list.map((address, index) => (
        <div
          key={`${address.provinceLevel.provinceId}/${address.districtLevel.districtId}/${address.wardLevel.wardCode}/${index}`}
          className="w-full flex text-base border-b-2 border-slate-400 py-2.5 "
        >
          <div className="w-2/3 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-end">
              <h5 className="font-semibold text-primary truncate sm:w-[120px]">
                {address.customerName}
              </h5>
              <div className="flex gap-2.5">
                <p className="text-zinc-500 font-normal">{address.phoneNumbers}</p>
                {address.isDefault && <Badge className="bg-primary">Mặc định</Badge>}
              </div>
            </div>
            <p className="text-zinc-500 text-sm">{ADDRESS_TYPES.get(address.type)?.typeValue}</p>
            <div className="flex items-center w-full">
              <p className="text-zinc-500 truncate">{buildAddressString(address)}</p>
            </div>
          </div>
          <div className="w-1/3 h-auto flex flex-col sm:flex-row items-end justify-center sm:items-center sm:justify-end">
            <Button variant="ghost" className="uppercase text-primary-dark py-1 px-2.5" onClick={() => onOpenUpdateModal(index)}>
              Sửa
            </Button>
            <Button variant="destructive" className="uppercase text-primary-dark py-1 px-2.5">
              <Trash className="text-white h-5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
