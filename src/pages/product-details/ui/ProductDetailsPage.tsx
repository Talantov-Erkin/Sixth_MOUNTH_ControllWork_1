import { Link, useParams } from 'react-router-dom'
import {
  formatCategory,
  ProductPrice,
  ProductRating,
  useProduct,
} from '@/entities/product'
import { ToggleFavoriteButton } from '@/features/toggle-favorite'
import { getErrorMessage, isNotFoundError } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import {
  ArrowLeftIcon,
  Badge,
  buttonStyles,
  EmptyState,
  ErrorState,
  Spinner,
} from '@/shared/ui'
import { ProductGallery } from './ProductGallery'

/** `"12"` → 12; всё остальное (`"abc"`, `"1.5"`, `"0"`) → `null`. */
const parseProductId = (raw: string | undefined): number | null => {
  if (raw === undefined || !/^\d+$/.test(raw)) return null
  const id = Number(raw)
  return id > 0 ? id : null
}

const BackLink = () => (
  <Link to={ROUTES.catalog} className={buttonStyles({ variant: 'ghost', size: 'sm', className: '-ml-3 self-start' })}>
    <ArrowLeftIcon className="size-4" />
    Назад в каталог
  </Link>
)

const StockBadge = ({ stock }: { stock: number }) => {
  if (stock <= 0) return <Badge variant="danger">Нет в наличии</Badge>
  if (stock <= 10) return <Badge variant="warning">Осталось: {stock} шт.</Badge>
  return <Badge variant="success">В наличии: {stock} шт.</Badge>
}

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const productId = parseProductId(id)
  const productQuery = useProduct(productId)

  if (productId === null || isNotFoundError(productQuery.error)) {
    return (
      <div className="flex flex-col gap-4">
        <BackLink />
        <EmptyState
          title="Товар не найден"
          description="Возможно, ссылка устарела или товар был удалён."
          action={
            <Link to={ROUTES.catalog} className={buttonStyles()}>
              Перейти в каталог
            </Link>
          }
        />
      </div>
    )
  }

  if (productQuery.isError) {
    return (
      <div className="flex flex-col gap-4">
        <BackLink />
        <ErrorState
          title="Не удалось загрузить товар"
          description={getErrorMessage(productQuery.error)}
          onRetry={() => void productQuery.refetch()}
        />
      </div>
    )
  }

  const product = productQuery.data
  if (product === undefined) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" label="Загрузка товара…" />
      </div>
    )
  }

  const images = product.images.length > 0 ? product.images : [product.thumbnail]

  return (
    <article className="flex flex-col gap-6">
      <BackLink />

      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery key={product.id} title={product.title} images={images} />

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="neutral">{formatCategory(product.category)}</Badge>
            {product.brand && <Badge variant="brand">{product.brand}</Badge>}
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {product.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <ProductRating rating={product.rating} />
            <StockBadge stock={product.stock} />
          </div>

          <ProductPrice product={product} size="lg" />

          <p className="leading-7 text-slate-700">{product.description}</p>

          <div className="mt-2 flex flex-wrap gap-3">
            <ToggleFavoriteButton productId={product.id} productTitle={product.title} variant="full" />
            <Link to={ROUTES.catalog} className={buttonStyles({ variant: 'outline', size: 'lg' })}>
              Вернуться к каталогу
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
