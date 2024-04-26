'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface OutstandingFeaturesProps {
  productDes: string;
}

const OutstandingFeatures = ({ productDes }: Readonly<OutstandingFeaturesProps>) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full text-center bg-white rounded-md h-fit">
      <div className="text-xl font-bold text-primary uppercase py-4">Đặc Điểm Nổi Bật</div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent className="space-y-2">
          <div className="w-full text-left py-5">
            {productDes}
          </div>
        </CollapsibleContent>
        <CollapsibleTrigger asChild className="my-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-18 p-4 text-white bg-primary hover:bg-primary hover:text-white"
          >
            {isOpen ? 'Thu lại' : 'Xem thêm'}
          </Button>
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  );
};

export default OutstandingFeatures;
