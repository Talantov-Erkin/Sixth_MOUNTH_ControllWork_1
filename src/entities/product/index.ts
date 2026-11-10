// Public API сущности `product`
export type {
  AllCategories,
  CategoriesResponse,
  Product,
  ProductCategory,
  ProductFilters,
  ProductsResponse,
  SortOption,
} from './model/types'
export { ALL_CATEGORIES } from './model/constants'
export { useCategories, useProduct, useProducts } from './api/productQueries'
export { formatCategory } from './lib/formatCategory'
export { getDiscountPercent, getDiscountedPrice, hasDiscount } from './lib/price'
export { ProductCard } from './ui/ProductCard'
export { ProductCardSkeleton } from './ui/ProductCardSkeleton'
export { ProductPrice } from './ui/ProductPrice'
export { ProductRating } from './ui/ProductRating'
