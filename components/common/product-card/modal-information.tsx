'use client';

import { productApiRequest } from '@/apiRequests/product';
import { ProductDto } from '@techcell/node-sdk';
import { useEffect, useState } from 'react';
import SmallLoading from '../small-loading';
import { SelectProductVariation } from '@/components/product/select-product-variation';
import { Modal } from '@/components/ui/modal';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ModalInformationProps {
  productId: string | null;
  onClose: () => void;
}

export const ModalInformation = ({ productId, onClose }: ModalInformationProps) => {
  const [productDetail, setProductDetail] = useState<ProductDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getVariations = async (id: string) => {
      setIsLoading(true);
      const { payload } = await productApiRequest.getProductById({ productId: id });

      setProductDetail(payload);
      setIsLoading(false);
    };

    if (productId && !productDetail) {
      getVariations(productId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleClose = () => {
    setProductDetail(null);
    onClose();
  };

  return (
    <Modal title="Chọn sản phẩm" isOpen={Boolean(productId)} onClose={handleClose}>
      {isLoading && <SmallLoading />}
      {productDetail && (
        <ScrollArea className="w-full h-[350px]">
          <SelectProductVariation
            productId={productDetail.productId}
            variations={productDetail.variations}
            handleClose={handleClose}
          />
        </ScrollArea>
      )}
    </Modal>
  );
};
