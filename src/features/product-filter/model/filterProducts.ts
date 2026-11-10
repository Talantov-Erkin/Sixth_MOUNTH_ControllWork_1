import { ALL_CATEGORIES } from '@/entities/product'
import type { Product, ProductFilters } from '@/entities/product'

export const DEFAULT_FILTERS: ProductFilters = {
  category: ALL_CATEGORIES,
  minPrice: null,
  maxPrice: null,
}

export const hasActiveFilters = (filters: ProductFilters): boolean =>
  filters.category !== ALL_CATEGORIES || filters.minPrice !== null || filters.maxPrice !== null

export const isPriceRangeInvalid = ({ minPrice, maxPrice }: ProductFilters): boolean =>
  minPrice !== null && maxPrice !== null && minPrice > maxPrice

/**
 * Фильтрация по категории и диапазону цен (границы включительно).
 * Чистая функция: исходный массив не изменяется, всегда возвращается новый.
 */
export const filterProducts = (
  products: readonly Product[],
  filters: ProductFilters,
): Product[] =>
  products.filter((product) => {
    if (filters.category !== ALL_CATEGORIES && product.category !== filters.category) return false
    if (filters.minPrice !== null && product.price < filters.minPrice) return false
    if (filters.maxPrice !== null && product.price > filters.maxPrice) return false
    return true
  })
