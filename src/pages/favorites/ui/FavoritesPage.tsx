import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '@/entities/product'
import { useFavoriteIds } from '@/features/toggle-favorite'
import { getErrorMessage } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { buttonStyles, EmptyState, ErrorState, HeartIcon } from '@/shared/ui'
import { ProductGrid, ProductGridSkeleton } from '@/widgets/product-grid'

export const FavoritesPage = () => {
  const favoriteIds = useFavoriteIds()
  const productsQuery = useProducts()

  const favoriteProducts = useMemo(
    () => (productsQuery.data ?? []).filter((product) => favoriteIds.includes(product.id)),
    [productsQuery.data, favoriteIds],
  )

  const renderContent = () => {
    if (favoriteIds.length === 0) {
      return (
        <EmptyState
          icon={<HeartIcon />}
          title="В избранном пока пусто"
          description="Нажмите на сердечко у товара, чтобы сохранить его здесь."
          action={
            <Link to={ROUTES.catalog} className={buttonStyles()}>
              Перейти в каталог
            </Link>
          }
        />
      )
    }
    if (productsQuery.isPending) return <ProductGridSkeleton count={favoriteIds.length} />
    if (productsQuery.isError) {
      return (
        <ErrorState
          title="Не удалось загрузить избранное"
          description={getErrorMessage(productsQuery.error)}
          onRetry={() => void productsQuery.refetch()}
        />
      )
    }
    return <ProductGrid products={favoriteProducts} />
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Избранное</h1>
        <p className="mt-1 text-slate-600">Товаров: {favoriteIds.length}</p>
      </div>
      {renderContent()}
    </div>
  )
}
