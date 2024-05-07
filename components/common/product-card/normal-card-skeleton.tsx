import { Skeleton } from '@/components/ui/skeleton';

export const NormalCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center gap-5 lg:gap-7 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Skeleton className="w=full sm:w-[280px] h-[400px] rounnded-lg" />
      <Skeleton className="w=full sm:w-[280px] h-[400px] rounnded-lg" />
      <Skeleton className="w=full sm:w-[280px] h-[400px] rounnded-lg" />
      <Skeleton className="w=full sm:w-[280px] h-[400px] rounnded-lg" />
    </div>
  );
};
