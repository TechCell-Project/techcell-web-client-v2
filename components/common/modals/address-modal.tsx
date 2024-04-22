'use client';

import React from 'react';
import { Modal } from '@/components/ui/modal';
import { useAddressModal } from '@/hooks/useAddressModal';
import { AddressForm } from '@/components/profile/address-form';
import { UserAddressResponseDto } from '@techcell/node-sdk';

interface AddressModalProps {
  addressList: UserAddressResponseDto[];
}

const AddressModal = ({ addressList }: AddressModalProps) => {
  const { isOpen, onClose, addressIndex } = useAddressModal();

  return (
    <Modal title={addressIndex ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ'} isOpen={isOpen} onClose={onClose}>
      <AddressForm index={addressIndex} closeModal={onClose} addressList={addressList} />
    </Modal>
  );
};

export default AddressModal;
