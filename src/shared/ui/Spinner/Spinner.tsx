import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  size?: SpinnerSize
  /** Текст для скринридеров */
  label?: string
  /** Декоративный спиннер (например, внутри кнопки) скрывается от скринридеров */
  decorative?: boolean
}

const sizes: Record<SpinnerSize, string> = {
  sm: 'size-4 border-2',
  md: 'size-8 border-[3px]',
  lg: 'size-12 border-4',
}

export const Spinner = ({
  size = 'md',
  label = 'Загрузка…',
  decorative = false,
  className,
  ...rest
}: SpinnerProps) => (
  <span
    role={decorative ? undefined : 'status'}
    aria-hidden={decorative || undefined}
    className={cn('inline-flex items-center justify-center', className)}
    {...rest}
  >
    <span
      className={cn(
        'animate-spin rounded-full border-current border-t-transparent text-brand-600',
        sizes[size],
      )}
    />
    {!decorative && <span className="sr-only">{label}</span>}
  </span>
)
