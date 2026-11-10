import { http } from '@/shared/api'
import type { CategoriesResponse, Product, ProductsResponse } from '../model/types'

export const fetchProducts = async (signal?: AbortSignal): Promise<ProductsResponse> => {
  const { data } = await http.get<ProductsResponse>('/products', {
    params: { limit: 0 },
    signal,
  })
  return data
}

export const fetchProduct = async (id: number, signal?: AbortSignal): Promise<Product> => {
  const { data } = await http.get<Product>(`/products/${id}`, { signal })
  return data
}

export const fetchCategories = async (signal?: AbortSignal): Promise<CategoriesResponse> => {
  const { data } = await http.get<CategoriesResponse>('/products/category-list', { signal })
  return data
}
