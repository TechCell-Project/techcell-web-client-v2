'use client';

import React from 'react';
import { Modal } from '@/components/ui/modal';
import { useAddressModal } from '@/hooks/useAddressModal';
import { AddressForm } from '@/components/profile/AddressForm';

const AddressModal = () => {
  const addressModal = useAddressModal();

  return (
    <Modal title="Thêm địa chỉ" isOpen={addressModal.isOpen} onClose={addressModal.onClose}>
      <AddressForm initialData={null} closeModal={addressModal.onClose} />
    </Modal>
  );
};

export default AddressModal;
