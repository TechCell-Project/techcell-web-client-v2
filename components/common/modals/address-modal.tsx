import React from 'react';
import { Modal } from '@/components/ui/modal';
import { useAddressModal } from '@/hooks/useAddressModal';

const AddressModal = () => {
  const addressModal = useAddressModal();

  return (
    <Modal title="Thêm địa chỉ" isOpen={addressModal.isOpen} onClose={addressModal.onClose}>
      AddressModal
    </Modal>
  );
};

export default AddressModal;
