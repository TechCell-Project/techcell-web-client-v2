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

export function DialogSpecification() {
  return (
    <div className="w-full text-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-[#ee4949] border-[#ee4949] bg-white rounded-md hover:text-[#ee4949] hover:bg-white"
          >
            Xem thêm chi tiết
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thông số kỹ thuật</DialogTitle>
          </DialogHeader>
          <div>
            <TableSpecificationDetail />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="bg-[#ee4949] text-white hover:text-white hover:bg-[#ee4949]"
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
}
