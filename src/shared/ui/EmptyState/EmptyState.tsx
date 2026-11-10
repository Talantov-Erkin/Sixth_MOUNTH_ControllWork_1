import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib'
import { PackageIcon } from '../icons'

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string
  description?: string
  /** Иконка; по умолчанию — коробка */
  icon?: ReactNode
  /** Кнопка или ссылка с действием */
  action?: ReactNode
}

export const EmptyState = ({
  title,
  description,
  icon,
  action,
  className,
  ...rest
}: EmptyStateProps) => (
  <div
    className={cn(
      'flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center',
      className,
    )}
    {...rest}
  >
    <div className="flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 [&>svg]:size-7">
      {icon ?? <PackageIcon />}
    </div>
    <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
    {description && <p className="max-w-md text-sm text-slate-600">{description}</p>}
    {action && <div className="mt-2">{action}</div>}
  </div>
)
