'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { GetMeResponseDto } from '@techcell/node-sdk';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import MaxWidthWrapper from '@/components/common/max-width-wrapper';
import LoadingPage from '@/app/loading';
import { UpdateProfile } from './profile-form';
import { UpdatePassword } from './password-form';
import { UserAddressList } from './address-list';

import LogoText from '@/public/logo-text-red.png';
import { cn } from '@/lib/utils';
import { PencilLine, Plus } from 'lucide-react';
import { useAddressModal } from '@/hooks/useAddressModal';
import { clientSessionToken } from '@/lib/http';

interface ProfileProps {
  profile: GetMeResponseDto;
}

const Profile = ({ profile }: ProfileProps) => {
  const { onOpen, setAddressIndex } = useAddressModal();

  const [isEditInfo, setIsEditInfo] = useState<boolean>(false);
  const [isEditPassword, setIsEditPassword] = useState<boolean>(false);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const handleOpenAddNewAddress = () => {
    setAddressIndex(null);
    onOpen();
  };

  const handleOpenUpdateAddress = (index: number) => {
    setAddressIndex(index);
    onOpen();
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingPage />;
  }

  console.log(clientSessionToken.accessValue);

  return (
    <MaxWidthWrapper className="sm:max-w-[960px]">
      <Tabs
        defaultValue="information"
        className="w-full h-full flex flex-col sm:flex-row gap-2.5 sm:gap-6"
      >
        <div className="w-full sm:w-1/5 h-fit rounded-md bg-white sm:py-5">
          <TabsList className="grid w-full h-auto grid-cols-2 sm:grid-cols-1 rounded-none [&>button]:text-base [&>button]:rounded-md sm:[&>button]:rounded-r-none p-0 bg-inherit">
            <TabsTrigger value="information">Thông tin</TabsTrigger>
            <TabsTrigger value="privacy">Bảo mật</TabsTrigger>
          </TabsList>
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
        <TabsContent
          value="information"
          className="w-full m-0 flex-col gap-5 sm:w-4/5 h-fit rounded-md bg-white p-2.5 sm:p-5"
        >
          <h4 className="text-lg font-semibold">Thông tin cơ bản</h4>
          <Separator className="my-2.5" />
          <div className="w-full relative">
            <Button
              variant="default"
              className={cn(
                'absolute top-0 right-0 text-sm gap-2.5',
                isEditInfo ? 'hidden' : 'flex',
              )}
              onClick={() => setIsEditInfo(true)}
            >
              Chỉnh sửa
              <PencilLine className="w-5" />
            </Button>
            <UpdateProfile
              initialData={profile}
              editable={isEditInfo}
              closeEdit={() => setIsEditInfo(false)}
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
            {profile.address && <UserAddressList list={profile.address} onOpenUpdateModal={handleOpenUpdateAddress} />}
          </div>
        </TabsContent>
        <TabsContent
          value="privacy"
          className="w-full m-0 flex-col gap-5 sm:w-4/5 h-fit rounded-md bg-white p-2.5 sm:p-5"
        >
          <h4 className="text-lg font-semibold">Riêng tư và bảo mật</h4>
          <Separator className="my-2.5" />
          <UpdatePassword editable={isEditPassword} discardEdit={() => setIsEditPassword(false)} />
          <Button
            variant="default"
            className={cn('gap-2.5', isEditPassword ? 'hidden' : 'flex')}
            onClick={() => setIsEditPassword(true)}
          >
            Đổi mật khẩu
            <PencilLine className="w-5" />
          </Button>
        </TabsContent>
      </Tabs>
    </MaxWidthWrapper>
  );
};

export default Profile;
