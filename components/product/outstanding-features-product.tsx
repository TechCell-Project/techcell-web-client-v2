import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
const OutstandingFeatures = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="my-24 text-center bg-white rounded-md">
      <div className="text-xl font-bold text-[#ee4949] uppercase py-4">Đặc Điểm Nổi Bật</div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent className="space-y-2">
          <div className="w-full text-left py-2">
            Đánh giá iPhone 13 - Flagship được mong chờ năm 2021 Cuối năm 2020, bộ 4 iPhone 12 đã
            được ra mắt với nhiều cái tiến. Sau đó, mọi sự quan tâm lại đổ dồn vào sản phẩm tiếp
            theo – iPhone 13. Vậy iP 13 sẽ có những gì nổi bật, hãy tìm hiểu ngay sau đây nhé! Thiết
            kế với nhiều đột phá Về kích thước, iPhone 13 sẽ có 4 phiên bản khác nhau và kích thước
            không đổi so với series iPhone 12 hiện tại. Nếu iPhone 12 có sự thay đổi trong thiết kế
            từ góc cạnh bo tròn (Thiết kế được duy trì từ thời iPhone 6 đến iPhone 11 Pro Max) sang
            thiết kế vuông vắn (đã từng có mặt trên iPhone 4 đến iPhone 5S, SE).
          </div>
        </CollapsibleContent>
        <CollapsibleTrigger asChild className='my-4'>
          <Button variant="ghost" size="sm" className="w-18 p-4 text-white bg-[#ee4949] hover:bg-[#ee4949] hover:text-white">
            {isOpen ? 'Thu lại' : 'Xem thêm'}
          </Button>
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  );
};

export default OutstandingFeatures;
