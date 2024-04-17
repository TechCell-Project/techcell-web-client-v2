'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import { User } from '@techcell/node-sdk';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import MaxWidthWrapper from '@/components/common/max-width-wrapper';
import LoadingPage from '@/app/loading';
import { UpdateProfile } from './profile-form';

import LogoText from '@/public/logo-text-red.png';
import { cn } from '@/lib/utils';
import { PencilLine, Plus } from 'lucide-react';
import { useAddressModal } from '@/hooks/useAddressModal';

interface ProfileProps {
  profile: User;
}

const Profile = ({ profile }: ProfileProps) => {
  const openAddressModal = useAddressModal((state) => state.onOpen);
  const setAddressToModal = useAddressModal((state) => state.setAddress);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const handleOpenAddNewAddress = () => {
    setAddressToModal(null);
    openAddressModal();
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingPage />;
  }

  return (
    <MaxWidthWrapper className="sm:max-w-[960px] h-full rounded-md flex flex-col sm:flex-row gap-2.5 sm:gap-6">
      <div className="w-full sm:w-1/5 h-fit rounded-md bg-white sm:py-5">
        <Tabs defaultValue="information" className="w-full h-fit bg-inherit">
          <TabsList className="grid w-full h-auto grid-cols-2 sm:grid-cols-1 rounded-none [&>button]:text-base [&>button]:rounded-md sm:[&>button]:rounded-r-none p-0 bg-inherit">
            <TabsTrigger value="information">Thông tin</TabsTrigger>
            <TabsTrigger value="privacy">Bảo mật</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="hidden sm:flex w-full justify-center">
          <Image
            src={LogoText.src}
            alt="logo"
            width={100}
            height={50}
            className="w-[120px] h-auto"
          />
        </div>
      </div>
      <div className="w-full flex-col gap-5 sm:w-4/5 h-fit rounded-md bg-white p-2.5 sm:p-5">
        <div className="w-full relative">
          <Button
            variant="default"
            className={cn('absolute top-0 right-0 text-sm gap-2.5', isEdit ? 'hidden' : 'flex')}
            onClick={() => setIsEdit(true)}
          >
            Chỉnh sửa
            <PencilLine className="w-5" />
          </Button>
          <UpdateProfile
            initialData={profile}
            editable={isEdit}
            closeEdit={() => setIsEdit(false)}
          />
        </div>
        <div className="w-full flex flex-col gap-4 text-base mt-4">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <h5 className="w-[54px] sm:w-20 font-semibold">Địa chỉ:</h5>
              <p className="text-zinc-500 font-normal">
                (Sl địa chỉ hiện tại: {profile.address?.length})
              </p>
            </div>
            <Button
              variant="outline"
              className="border-primary text-sm gap-2.5 text-primary hover:text-primary w-fit"
              onClick={handleOpenAddNewAddress}
            >
              Thêm địa chỉ
              <Plus className="w-5" />
            </Button>
          </div>
          {profile.address?.map((address, index) => (
            <div
              key={`${address.provinceLevel.provinceId}/${address.districtLevel.districtId}/${address.wardLevel.wardCode}/${index}`}
              className="w-full flex flex-col text-base"
            >
              <div className="flex items-end w-fill">
                <h5 className="w-1/5 font-semibold">{address.customerName}</h5>
                <p className="w-4/5 text-zinc-500 font-normal">{address.phoneNumbers}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Profile;
