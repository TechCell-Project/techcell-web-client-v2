import { Skeleton } from '@/components/ui/skeleton';

export const OrderListSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2.5">
      <Skeleton className="h-[200px] w-full rounded-sm" />
      <Skeleton className="h-[200px] w-full rounded-sm" />
      <Skeleton className="h-[200px] w-full rounded-sm" />
    </div>
  );
};
