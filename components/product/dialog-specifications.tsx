import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import TableSpecificationDetail from './table-specification-detail';
import { AttributeInProductDto } from '@techcell/node-sdk';
import { ScrollArea } from '../ui/scroll-area';

interface DialogSpecificationProps {
  productSpecifications: AttributeInProductDto[];
}

const DialogSpecification = ({ productSpecifications }: DialogSpecificationProps) => {
  return (
    <div className="text-center bottom-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary border-primary bg-white rounded-md hover:text-primary hover:bg-white"
          >
            Xem thêm chi tiết
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[800px] h-[90vh]">
          <DialogHeader>
            <DialogTitle>Thông số kỹ thuật</DialogTitle>
          </DialogHeader>
          <ScrollArea>
            <TableSpecificationDetail techInfo={productSpecifications} />
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="bg-primary text-white hover:text-white hover:bg-primary"
                type="button"
                variant="secondary"
              >
                Đóng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default DialogSpecification;
