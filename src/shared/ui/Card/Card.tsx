import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section'
  padding?: CardPadding
  /** Добавляет hover-эффект (подъём тени) для кликабельных карточек */
  interactive?: boolean
}

const paddings: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4 sm:p-5',
  lg: 'p-6 sm:p-8',
}

export const Card = ({
  as: Tag = 'div',
  padding = 'md',
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) => (
  <Tag
    className={cn(
      'rounded-xl border border-slate-200 bg-white shadow-sm',
      interactive && 'transition-shadow hover:shadow-md focus-within:shadow-md',
      paddings[padding],
      className,
    )}
    {...rest}
  >
    {children}
  </Tag>
)
