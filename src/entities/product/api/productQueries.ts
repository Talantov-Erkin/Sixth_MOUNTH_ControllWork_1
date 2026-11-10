import { queryOptions, useQuery } from '@tanstack/react-query'
import { isNotFoundError } from '@/shared/api'
import type { Product } from '../model/types'
import { fetchCategories, fetchProduct, fetchProducts } from './productApi'

const FIVE_MINUTES = 5 * 60 * 1000

export const productKeys = {
  all: ['products'] as const,
  list: () => [...productKeys.all, 'list'] as const,
  detail: (id: number) => [...productKeys.all, 'detail', id] as const,
  categories: () => [...productKeys.all, 'categories'] as const,
}

const productsQueryOptions = () =>
  queryOptions({
    queryKey: productKeys.list(),
    queryFn: ({ signal }) => fetchProducts(signal),
    select: (response): Product[] => response.products,
    staleTime: FIVE_MINUTES,
  })

const productQueryOptions = (id: number) =>
  queryOptions({
    queryKey: productKeys.detail(id),
    queryFn: ({ signal }) => fetchProduct(id, signal),
    staleTime: FIVE_MINUTES,
    // Несуществующий товар (404) повторять бессмысленно
    retry: (failureCount, error) => !isNotFoundError(error) && failureCount < 1,
  })

const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: productKeys.categories(),
    queryFn: ({ signal }) => fetchCategories(signal),
    staleTime: FIVE_MINUTES,
  })

export const useProducts = () => useQuery(productsQueryOptions())

/** `id = null` — id в URL некорректен, запрос не выполняется. */
export const useProduct = (id: number | null) =>
  useQuery({ ...productQueryOptions(id ?? -1), enabled: id !== null })

export const useCategories = () => useQuery(categoriesQueryOptions())
