import { cn } from '@/shared/lib'
import { Button, HeartIcon } from '@/shared/ui'
import { useIsFavorite, useToggleFavorite } from '../model/favoritesStore'

interface ToggleFavoriteButtonProps {
  productId: number
  productTitle: string
  /** `icon` — круглая иконка поверх карточки, `full` — кнопка с текстом */
  variant?: 'icon' | 'full'
  className?: string
}

export const ToggleFavoriteButton = ({
  productId,
  productTitle,
  variant = 'icon',
  className,
}: ToggleFavoriteButtonProps) => {
  const isFavorite = useIsFavorite(productId)
  const toggle = useToggleFavorite()

  if (variant === 'full') {
    return (
      <Button
        variant={isFavorite ? 'secondary' : 'primary'}
        size="lg"
        aria-pressed={isFavorite}
        leftIcon={<HeartIcon filled={isFavorite} className={cn(isFavorite && 'text-rose-500')} />}
        className={className}
        onClick={() => toggle(productId)}
      >
        {isFavorite ? 'В избранном' : 'Добавить в избранное'}
      </Button>
    )
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      aria-pressed={isFavorite}
      aria-label={`В избранное: ${productTitle}`}
      className={cn('rounded-full', className)}
      onClick={() => toggle(productId)}
    >
      <HeartIcon filled={isFavorite} className={cn(isFavorite ? 'text-rose-500' : 'text-slate-500')} />
    </Button>
  )
}
