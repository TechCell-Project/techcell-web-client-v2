'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  User,
  UserAddressResponseDto,
  UserAddressSchema,
  UserAddressSchemaDTO,
} from '@techcell/node-sdk';
import { buildAddressString } from '@/lib/utils';
import { ADDRESS_TYPES } from '@/constants';
import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Modal } from '@/components/ui/modal';
import { DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { authApiRequest } from '@/apiRequests/auth';
import { useAppContext } from '@/providers/app-provider';

interface AddressListProps {
  list: UserAddressResponseDto[] | UserAddressSchema[] | undefined;
  onOpenUpdateModal: (index: number) => void;
  onSelectIndex?: (index: number) => void;
  currentIndex?: number;
}

type DeleteAddressDialog = {
  isOpen: boolean;
  index: number | null;
};

export function UserAddressList({
  list,
  onOpenUpdateModal,
  onSelectIndex,
  currentIndex,
}: Readonly<AddressListProps>) {
  const { refresh } = useRouter();
  const { user, setUser } = useAppContext();
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(currentIndex ?? 0);
  const [openSetDefault, setOpenSetDefault] = useState<boolean>(false);
  const [openDeleteAddress, setOpenDeleteAddress] = useState<DeleteAddressDialog>({
    isOpen: false,
    index: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(currentIndex);

  useEffect(() => {
    if (onSelectIndex) {
      onSelectIndex(selectedAddressIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddressIndex]);

  if (!list || list.length === 0) {
    return (
      <div className="w-full h-10 flex items-center justify-center text-foreground text-base">
        <p>Bạn chưa có địa chỉ nào</p>
      </div>
    );
  }

  const onSetDefault = async () => {
    setIsLoading(true);
    try {
      const payload = list.map((address, index) => {
        return {
          ...address,
          isDefault: index === selectedAddressIndex,
        };
      });

      await authApiRequest.updateMe({
        address: payload as UserAddressSchemaDTO[],
      });

      setUser({
        ...user,
        address: payload as UserAddressSchema[],
      } as User);

      toast({
        variant: 'success',
        title: 'Thay đổi địa chỉ mặc định thành công',
      });
      refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Đổi địa chỉ mặc định thất bại',
      });
    } finally {
      setIsLoading(false);
      setOpenSetDefault(false);
    }
  };

  const onDeleteAddress = async (index: number | null) => {
    if (index === null) return;
    setIsLoading(true);
    try {
      const payload = list as unknown as UserAddressSchemaDTO[];

      payload.splice(index, 1);

      await authApiRequest.updateMe({
        address: payload,
      });

      setUser({
        ...user,
        address: payload as UserAddressSchema[],
      } as User);

      toast({
        variant: 'success',
        title: 'Thay đổi địa chỉ mặc định thành công',
      });
      refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Xóa địa chỉ thất bại',
      });
    } finally {
      setIsLoading(false);
      setOpenDeleteAddress({ isOpen: false, index: null });
      setSelectedAddressIndex(0);
    }
  };

  return (
    <RadioGroup
      className="w-full flex flex-col"
      defaultValue={String(selectedAddressIndex)}
      onValueChange={(value) => setSelectedAddressIndex(Number(value))}
    >
      <Button
        variant="ghost"
        className="w-fit text-base text-primary underline hover:text-primary-dark hover:bg-none px-0 py-2"
        disabled={list[selectedAddressIndex]?.isDefault}
        onClick={() => setOpenSetDefault(true)}
      >
        Đặt làm mặc định
      </Button>
      {list.map((address, index) => (
        <div
          key={`${address.provinceLevel.provinceId}/${address.districtLevel.districtId}/${address.wardLevel.wardCode}/${index}`}
          className="w-full flex text-base border-b-2 border-slate-400 py-2.5 "
        >
          <div className="w-2/3 flex gap-2.5 items-center">
            <RadioGroupItem value={index.toString()} id={index.toString()} className="w-5 h-5" />
            <div className="w-full space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-end">
                <h5 className="font-semibold text-primary truncate sm:w-[120px]">
                  {address.customerName}
                </h5>
                <div className="flex gap-2.5">
                  <p className="text-zinc-500 font-normal">{address.phoneNumbers}</p>
                  {address.isDefault && <Badge className="bg-primary">Mặc định</Badge>}
                </div>
              </div>
              <p className="text-zinc-500 text-sm">
                {ADDRESS_TYPES.get(address.type as 'home' | 'office' | 'other')?.typeValue}
              </p>
              <div className="flex items-center w-full">
                <p className="text-zinc-500 truncate">{buildAddressString(address)}</p>
              </div>
            </div>
          </div>
          <div className="w-1/3 h-auto flex flex-col sm:flex-row items-end justify-center sm:items-center sm:justify-end">
            <Button
              variant="ghost"
              className="uppercase text-primary-dark py-1 px-2.5"
              onClick={() => onOpenUpdateModal(index)}
            >
              Sửa
            </Button>
            <Button
              variant="destructive"
              className="uppercase text-primary-dark py-1 px-2.5"
              onClick={() => setOpenDeleteAddress({ isOpen: true, index })}
            >
              <Trash className="text-white h-5" />
            </Button>
          </div>
        </div>
      ))}
      <Modal
        title="Xác nhận đặt địa chỉ này làm mặc định?"
        isOpen={openSetDefault}
        onClose={() => setOpenSetDefault(false)}
      >
        <DialogFooter>
          <Button variant="default" onClick={onSetDefault} disabled={isLoading}>
            Xác nhận
          </Button>
          <Button variant="secondary" onClick={() => setOpenSetDefault(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </Modal>
      <Modal
        title="Xác nhận xóa địa chỉ này?"
        isOpen={openDeleteAddress.isOpen}
        onClose={() => setOpenDeleteAddress({ isOpen: false, index: null })}
      >
        <DialogFooter>
          <Button
            variant="default"
            onClick={() => onDeleteAddress(openDeleteAddress.index)}
            disabled={isLoading}
          >
            Xác nhận
          </Button>
          <Button
            variant="secondary"
            onClick={() => setOpenDeleteAddress({ isOpen: false, index: null })}
          >
            Đóng
          </Button>
        </DialogFooter>
      </Modal>
    </RadioGroup>
  );
}
