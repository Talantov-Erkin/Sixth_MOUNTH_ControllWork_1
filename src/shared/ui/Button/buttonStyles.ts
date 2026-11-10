import { cn } from '@/shared/lib'
import { focusRing } from '../styles'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

const base = cn(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap',
  'transition-colors select-none disabled:cursor-not-allowed disabled:opacity-50',
  focusRing,
)

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800',
  secondary:
    'bg-white text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 active:bg-slate-100',
  outline:
    'border border-brand-600 bg-transparent text-brand-700 hover:bg-brand-50 active:bg-brand-100',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200',
  danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'size-10 p-0',
}

interface ButtonStyleOptions {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
}

/** Классы кнопки — их можно применять и к ссылкам (`<Link>`), чтобы они выглядели как кнопки. */
export const buttonStyles = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: ButtonStyleOptions = {}): string =>
  cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)
