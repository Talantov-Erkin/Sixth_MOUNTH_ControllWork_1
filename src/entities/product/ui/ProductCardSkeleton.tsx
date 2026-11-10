import { Card, Skeleton } from '@/shared/ui'

export const ProductCardSkeleton = () => (
  <Card padding="none" className="overflow-hidden" aria-hidden>
    <Skeleton className="aspect-square rounded-none" />
    <div className="flex flex-col gap-3 p-4">
      <Skeleton className="h-5 w-20 rounded-full" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-7 w-24" />
    </div>
  </Card>
)
