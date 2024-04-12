'use client';

import React from 'react';
import { Modal } from '@/components/ui/modal';
import { UpdateProfile } from './profile-form';
import { useProfileModal } from '@/hooks/useProfileModal';

export const ProfileModal = () => {
  const profileModal = useProfileModal();

  return (
    <Modal
      title="Cập nhật Hồ sơ"
      description="Thay đổi thông tin của bạn tại đây. Ấn [Lưu] khi đã hoàn thành thay đổi."
      isOpen={profileModal.isOpen}
      onClose={profileModal.onClose}
    >
      <UpdateProfile />
    </Modal>
  );
};
