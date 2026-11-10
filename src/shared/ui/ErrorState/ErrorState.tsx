import { Button } from '../Button'
import { EmptyState } from '../EmptyState'
import { AlertIcon } from '../icons'

export interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

export const ErrorState = ({
  title = 'Что-то пошло не так',
  description,
  onRetry,
}: ErrorStateProps) => (
  <EmptyState
    role="alert"
    title={title}
    description={description}
    icon={<AlertIcon className="text-red-500" />}
    action={onRetry && <Button onClick={onRetry}>Попробовать снова</Button>}
  />
)
