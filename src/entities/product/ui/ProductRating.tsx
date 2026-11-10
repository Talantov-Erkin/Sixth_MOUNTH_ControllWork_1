import { StarIcon } from '@/shared/ui'

interface ProductRatingProps {
  rating: number
}

export const ProductRating = ({ rating }: ProductRatingProps) => (
  <span
    className="inline-flex items-center gap-1 text-sm font-medium text-slate-700"
    aria-label={`Рейтинг ${rating.toFixed(1)} из 5`}
  >
    <StarIcon className="size-4 text-amber-400" />
    {rating.toFixed(1)}
  </span>
)
