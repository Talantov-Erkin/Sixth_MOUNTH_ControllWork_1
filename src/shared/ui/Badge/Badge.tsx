import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

export type BadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
}

const variants: Record<BadgeVariant, string> = {
  neutral: 'bg-slate-100 text-slate-700',
  brand: 'bg-brand-100 text-brand-800',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-900',
  danger: 'bg-red-100 text-red-800',
}

const sizes: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
}

export const Badge = ({
  variant = 'neutral',
  size = 'md',
  className,
  children,
  ...rest
}: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap',
      variants[variant],
      sizes[size],
      className,
    )}
    {...rest}
  >
    {children}
  </span>
)
