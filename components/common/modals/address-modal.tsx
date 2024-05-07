'use client';

import React from 'react';
import { Modal } from '@/components/ui/modal';
import { useAddressModal } from '@/hooks/useAddressModal';
import { AddressForm } from '@/components/profile/address-form';
import { useAppContext } from '@/providers/app-provider';

const AddressModal = () => {
  const { isOpen, onClose, addressIndex } = useAddressModal();
  const { user } = useAppContext();

  return user ? (
    <Modal
      title={addressIndex ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AddressForm index={addressIndex} closeModal={onClose} addressList={user.address ?? []} />
    </Modal>
  ) : null;
};

export default AddressModal;
