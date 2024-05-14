"use client"

import { useUpdateEffect } from 'ahooks';
import { useEffect, useState } from 'react';
import { useAddressModal } from '@/hooks/useAddressModal';
import { authApiRequest } from '@/apiRequests';
import { UserAddressResponseDto } from '@techcell/node-sdk';
import { UserAddressList } from '../profile/address-list';
const AddressCart = () => {

  const { onOpen, setAddressIndex } = useAddressModal();
  const [addressList, setAddressList] = useState<UserAddressResponseDto[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | undefined>(undefined);

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
    return (
        <>
            <h4 className="font-semibold text-xl">Chọn địa chỉ</h4>
              <UserAddressList
                list={addressList}
                onOpenUpdateModal={handleOpenUpdateAddress}
                currentIndex={selectedAddressIndex}
                onSelectIndex={setSelectedAddressIndex}
              />
        </>
    )
}

export default AddressCart;