import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { cn } from '@/shared/lib'
import { focusRing } from '../styles'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  hint?: string
  error?: string
  inputSize?: InputSize
  /** Элемент слева внутри поля (например, иконка) */
  leftAddon?: ReactNode
  wrapperClassName?: string
  ref?: Ref<HTMLInputElement>
}

const sizes: Record<InputSize, string> = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
}

export const Input = ({
  label,
  hint,
  error,
  inputSize = 'md',
  leftAddon,
  wrapperClassName,
  className,
  id,
  disabled,
  ref,
  ...rest
}: InputProps) => {
  const autoId = useId()
  const inputId = id ?? autoId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`
  const describedBy = error ? errorId : hint ? hintId : undefined

  return (
    <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftAddon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            {leftAddon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full rounded-lg border bg-white px-3 text-slate-900 placeholder:text-slate-400',
            'transition-colors hover:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 disabled:hover:border-slate-300',
            error ? 'border-red-500 hover:border-red-500' : 'border-slate-300',
            sizes[inputSize],
            leftAddon ? 'pl-10' : false,
            focusRing,
            className,
          )}
          {...rest}
        />
      </div>
      {error ? (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-sm text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
