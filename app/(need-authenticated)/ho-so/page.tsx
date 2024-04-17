'use client';

import React, { useEffect } from 'react';

import { authApiRequest } from '@/apiRequests';
import Profile from '@/components/profile/profile';
import LoadingPage from '@/app/loading';
import { useSafeState } from 'ahooks';
import { User } from '@techcell/node-sdk';
import { toast } from '@/components/ui/use-toast';
import { useAddressModal } from '@/hooks/useAddressModal';

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useSafeState<User | null>(null);
  const { addressList } = useAddressModal();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await authApiRequest.getMeClient();

        setCurrentUser(res.payload);
      } catch (error) {
        console.log(error);
        toast({
          variant: 'destructive',
          title: 'Không thể tải hồ sơ',
        });
      }
    };

    getCurrentUser();
  }, [addressList]);

  if (!currentUser) {
    return <LoadingPage />;
  }

  return <Profile profile={currentUser} />;
}
