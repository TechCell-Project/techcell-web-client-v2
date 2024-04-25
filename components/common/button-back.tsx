'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const { back } = useRouter();

  return (
    <Button variant="ghost" className='p-0' onClick={() => back()}>
      <ArrowLeft className="size-8" />
    </Button>
  );
};
