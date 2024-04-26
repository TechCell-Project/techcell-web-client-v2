'use client';

import { productApiRequest } from '@/apiRequests/product';
import { ProductDto, VariationDto } from '@techcell/node-sdk';
import { useEffect, useState } from 'react';
import SmallLoading from '../small-loading';
import { SelectProductVariation } from '@/components/product/select-product-variation';
import { Modal } from '@/components/ui/modal';

interface ModalInformationProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalInformation = ({ productId, isOpen, onClose }: ModalInformationProps) => {
  const [productDetail, setProductDetail] = useState<ProductDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getVariations = async () => {
      setIsLoading(true);
      const { payload } = await productApiRequest.getProductById({ productId });

      setProductDetail(payload);
      setIsLoading(false);
    };
    if (isOpen && !productDetail) {
      getVariations();
    }
  }, [isOpen, productId]);

  return (
    <Modal title="Chọn sản phẩm" isOpen={isOpen} onClose={onClose}>
      {isLoading && <SmallLoading />}
      {productDetail && (
        <div className="w-full">
          <SelectProductVariation productId={productId} variations={productDetail.variations} />
        </div>
      )}
    </Modal>
  );
};
