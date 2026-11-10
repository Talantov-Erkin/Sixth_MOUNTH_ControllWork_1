import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import { Spinner } from '../Spinner'
import { buttonStyles, type ButtonSize, type ButtonVariant } from './buttonStyles'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Показывает спиннер и блокирует кнопку */
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: ReactNode
  ref?: Ref<HTMLButtonElement>
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  disabled,
  className,
  children,
  type = 'button',
  ref,
  ...rest
}: ButtonProps) => (
  <button
    ref={ref}
    type={type}
    disabled={disabled || loading}
    aria-busy={loading || undefined}
    className={buttonStyles({ variant, size, fullWidth, className })}
    {...rest}
  >
    {loading ? <Spinner size="sm" decorative /> : leftIcon}
    {children}
  </button>
)
