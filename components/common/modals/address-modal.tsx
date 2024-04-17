'use client';

import React from 'react';
import { Modal } from '@/components/ui/modal';
import { useAddressModal } from '@/hooks/useAddressModal';
import { AddressForm } from '@/components/profile/address-form';

const AddressModal = () => {
  const { isOpen, onClose, addressIndex } = useAddressModal();

  return (
    <Modal title={addressIndex ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ'} isOpen={isOpen} onClose={onClose}>
      <AddressForm index={addressIndex} closeModal={onClose} />
    </Modal>
  );
};

export default AddressModal;
