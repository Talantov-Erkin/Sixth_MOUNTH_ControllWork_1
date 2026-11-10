import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

/** Плейсхолдер загрузки. Размеры задаются через className. */
export const Skeleton = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div aria-hidden className={cn('animate-pulse rounded-md bg-slate-200', className)} {...rest} />
)
