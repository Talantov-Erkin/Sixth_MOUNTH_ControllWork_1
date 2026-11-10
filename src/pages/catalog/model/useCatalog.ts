import { useMemo, useState } from 'react'
import type { Product, ProductFilters, SortOption } from '@/entities/product'
import { DEFAULT_FILTERS, filterProducts } from '@/features/product-filter'
import { searchProducts } from '@/features/product-search'
import { DEFAULT_SORT, sortProducts } from '@/features/product-sort'

/**
 * Состояние страницы каталога: поиск, фильтры и сортировка работают совместно.
 * Порядок: поиск → фильтры → сортировка.
 */
export const useCatalog = (products: readonly Product[] | undefined) => {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT)

  const visibleProducts = useMemo(
    () => (products ? sortProducts(filterProducts(searchProducts(products, query), filters), sort) : []),
    [products, query, filters, sort],
  )

  const resetFilters = () => setFilters(DEFAULT_FILTERS)
  const resetAll = () => {
    setQuery('')
    setFilters(DEFAULT_FILTERS)
  }

  return {
    query,
    setQuery,
    filters,
    setFilters,
    sort,
    setSort,
    visibleProducts,
    resetFilters,
    resetAll,
  }
}
