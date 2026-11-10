import type { Product } from '@/entities/product'

export const normalizeQuery = (query: string): string => query.trim().toLowerCase()

/**
 * Поиск по названию без учёта регистра.
 * Чистая функция: исходный массив не изменяется, всегда возвращается новый.
 */
export const searchProducts = (products: readonly Product[], query: string): Product[] => {
  const normalized = normalizeQuery(query)
  if (normalized === '') return [...products]
  return products.filter((product) => product.title.toLowerCase().includes(normalized))
}
