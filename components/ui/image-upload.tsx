'use client';

import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { CldImage, CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';

import { Button } from '@/components/ui/button';

import { ImagePlus, Trash } from 'lucide-react';

import AlternativeAvatar from '@/public/temp/avatarColor.webp';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  changable: boolean;
}

const ImageUpload: FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value, changable }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [resource, setResource] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUploadImg = (result: CloudinaryUploadWidgetResults) => {
    if (result.info) {
      onChange(typeof result.info === 'string' ? result.info : result.info.public_id);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mb-4 flex flex-col items-center gap-4">
      {value.map((publicId) => (
        <div key={publicId} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
          <div className={cn("z-10 absolute top-0 right-0", !changable && 'hidden')}>
            <Button
              type="button"
              onClick={() => onRemove(publicId)}
              variant="destructive"
              size="sm"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <CldImage
            alt="user avatar"
            src={publicId}
            width={200}
            height={200}
            className="w-full max-w-[120px] sm:max-w-[200px] h-full max-h-[120px] sm:max-h-[200px] rounded-full object-cover"
          />
        </div>
      ))}
      {value.length === 0 && (
        <Image
          alt="temp user avatar"
          src={AlternativeAvatar.src}
          width={200}
          height={200}
          className="w-full max-w-[120px] sm:max-w-[200px] h-full max-h-[120px] sm:max-h-[200px] rounded-full object-cover"
        />
      )}
      <CldUploadWidget
        options={{ sources: ['local', 'url'] }}
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={(result) => onUploadImg(result)}
        uploadPreset='techcell-public-image'
      >
        {({ open }) => {
          const onClick = () => {
            setResource(undefined);
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
              className={cn(!changable && 'hidden')}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
