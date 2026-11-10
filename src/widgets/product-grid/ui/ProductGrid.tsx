import { ProductCard, ProductCardSkeleton } from '@/entities/product'
import type { Product } from '@/entities/product'
import { ToggleFavoriteButton } from '@/features/toggle-favorite'

const gridClassName = 'grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6'

interface ProductGridProps {
  products: readonly Product[]
}

export const ProductGrid = ({ products }: ProductGridProps) => (
  <ul className={gridClassName}>
    {products.map((product) => (
      <li key={product.id}>
        <ProductCard
          product={product}
          action={<ToggleFavoriteButton productId={product.id} productTitle={product.title} />}
        />
      </li>
    ))}
  </ul>
)

interface ProductGridSkeletonProps {
  count?: number
}

export const ProductGridSkeleton = ({ count = 8 }: ProductGridSkeletonProps) => (
  <div className={gridClassName} role="status" aria-label="Загрузка товаров">
    {Array.from({ length: count }, (_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
)
