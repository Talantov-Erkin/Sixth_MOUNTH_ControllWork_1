export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  thumbnail: string
  images: string[]
}

/** Ответ `GET /products?limit=0` */
export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

/** Ответ `GET /products/category-list` — массив slug-ов категорий */
export type ProductCategory = string
export type CategoriesResponse = ProductCategory[]

export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'title-asc'

/** Значение `category`, при котором фильтр по категории не применяется */
export type AllCategories = 'all'

export interface ProductFilters {
  category: ProductCategory | AllCategories
  /** `null` — нижняя граница не задана */
  minPrice: number | null
  /** `null` — верхняя граница не задана */
  maxPrice: number | null
}
