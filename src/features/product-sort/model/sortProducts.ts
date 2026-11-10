import type { Product, SortOption } from '@/entities/product'

export const DEFAULT_SORT: SortOption = 'rating-desc'

export const SORT_OPTIONS: readonly { value: SortOption; label: string }[] = [
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'rating-desc', label: 'Рейтинг: по убыванию' },
  { value: 'title-asc', label: 'Название: А → Я' },
]

export const isSortOption = (value: string): value is SortOption =>
  SORT_OPTIONS.some((option) => option.value === value)

const comparators: Record<SortOption, (a: Product, b: Product) => number> = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'rating-desc': (a, b) => b.rating - a.rating,
  'title-asc': (a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }),
}

/**
 * Сортировка по выбранному критерию.
 * Чистая функция: сортируется копия, исходный массив не изменяется.
 */
export const sortProducts = (products: readonly Product[], sort: SortOption): Product[] =>
  [...products].sort(comparators[sort])
