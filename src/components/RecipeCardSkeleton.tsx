import { Skeleton } from '@/components/ui/skeleton';


const RecipeCardSkeleton = () => {
  return (
    <div className="overflow-hidden shadow-lg bg-[#FFF0ED] rounded-xl">
      <div className="flex flex-col">
        {/* Image skeleton */}
        <Skeleton className="h-[220px] w-full rounded-t-xl" />

        {/* Content */}
        <div className="py-4 px-5 space-y-3">
          {/* Title skeleton */}
          <Skeleton className="h-7 w-3/4" />

          {/* Recipe stats skeleton */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>

          {/* Likes and publication date skeleton */}
          <div className="flex justify-between items-center pt-1">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-4 w-28" />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-2"></div>

          {/* Author and follow button skeleton */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCardSkeleton
