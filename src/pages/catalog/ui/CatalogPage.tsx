import { useCategories, useProducts } from '@/entities/product'
import { ProductFilter } from '@/features/product-filter'
import { ProductSearch } from '@/features/product-search'
import { ProductSort } from '@/features/product-sort'
import { getErrorMessage } from '@/shared/api'
import { Button, Card, EmptyState, ErrorState, SearchIcon } from '@/shared/ui'
import { ProductGrid, ProductGridSkeleton } from '@/widgets/product-grid'
import { useCatalog } from '../model/useCatalog'

export const CatalogPage = () => {
  const productsQuery = useProducts()
  const categoriesQuery = useCategories()
  const catalog = useCatalog(productsQuery.data)

  const total = productsQuery.data?.length ?? 0

  const renderResults = () => {
    if (productsQuery.isPending) return <ProductGridSkeleton />
    if (productsQuery.isError) {
      return (
        <ErrorState
          title="Не удалось загрузить товары"
          description={getErrorMessage(productsQuery.error)}
          onRetry={() => void productsQuery.refetch()}
        />
      )
    }
    if (catalog.visibleProducts.length === 0) {
      return (
        <EmptyState
          icon={<SearchIcon />}
          title="Ничего не найдено"
          description="Попробуйте изменить поисковый запрос или сбросить фильтры."
          action={<Button onClick={catalog.resetAll}>Сбросить поиск и фильтры</Button>}
        />
      )
    }
    return <ProductGrid products={catalog.visibleProducts} />
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Каталог товаров
        </h1>
        <p className="mt-1 text-slate-600" aria-live="polite">
          {productsQuery.isSuccess
            ? `Показано ${catalog.visibleProducts.length} из ${total}`
            : 'Выберите товар по душе'}
        </p>
      </div>

      <Card className="flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-[1fr_16rem]">
          <ProductSearch value={catalog.query} onChange={catalog.setQuery} />
          <ProductSort value={catalog.sort} onChange={catalog.setSort} />
        </div>
        <ProductFilter
          categories={categoriesQuery.data ?? []}
          value={catalog.filters}
          onChange={catalog.setFilters}
          onReset={catalog.resetFilters}
        />
      </Card>

      {renderResults()}
    </div>
  )
}
