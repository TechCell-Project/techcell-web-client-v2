import { Skeleton } from "@/components/ui/skeleton"

const SkeletonCard = () => {
    return (
        <div className="w-full h-40 bg-slate-400 rounded-md flex items-center my-2.5">
            <Skeleton className="max-w-[120px] w-full h-[120px] bg-slate-100 rounded-md" />
            <div className="w-full flex flex-col gap-2.5">
                <Skeleton className="w-4/5 h-5 bg-slate-100 rounded-md" />
                <Skeleton className="w-3/5 h-5 bg-slate-100 rounded-md" />
            </div>
        </div>
    )
}

export const CartProductSkeleton = () => {
    return (
        <div className="w-full flex flex-col gap-2.5">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    )
}