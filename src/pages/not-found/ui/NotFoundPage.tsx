import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/config'
import { buttonStyles, EmptyState } from '@/shared/ui'

export const NotFoundPage = () => (
  <EmptyState
    title="404 — страница не найдена"
    description="Такой страницы не существует или она была перемещена."
    action={
      <Link to={ROUTES.catalog} className={buttonStyles()}>
        Вернуться в каталог
      </Link>
    }
  />
)
