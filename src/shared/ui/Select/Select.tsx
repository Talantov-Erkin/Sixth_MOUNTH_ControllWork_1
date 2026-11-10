import { useId } from 'react'
import type { Ref, SelectHTMLAttributes } from 'react'
import { cn } from '@/shared/lib'
import { ChevronDownIcon } from '../icons'
import { focusRing } from '../styles'

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'children'> {
  options: readonly SelectOption[]
  label?: string
  hint?: string
  error?: string
  /** Пустой пункт в начале списка (value = '') */
  placeholder?: string
  selectSize?: SelectSize
  wrapperClassName?: string
  ref?: Ref<HTMLSelectElement>
}

const sizes: Record<SelectSize, string> = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
}

export const Select = ({
  options,
  label,
  hint,
  error,
  placeholder,
  selectSize = 'md',
  wrapperClassName,
  className,
  id,
  ref,
  ...rest
}: SelectProps) => {
  const autoId = useId()
  const selectId = id ?? autoId
  const hintId = `${selectId}-hint`
  const errorId = `${selectId}-error`
  const describedBy = error ? errorId : hint ? hintId : undefined

  return (
    <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full appearance-none rounded-lg border bg-white pr-10 pl-3 text-slate-900',
            'transition-colors hover:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 disabled:hover:border-slate-300',
            error ? 'border-red-500 hover:border-red-500' : 'border-slate-300',
            sizes[selectSize],
            focusRing,
            className,
          )}
          {...rest}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-500" />
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
