import { cn, formatPrice } from '@/shared/lib'
import { Badge } from '@/shared/ui'
import { getDiscountPercent, getDiscountedPrice, hasDiscount } from '../lib/price'
import type { Product } from '../model/types'

interface ProductPriceProps {
  product: Pick<Product, 'price' | 'discountPercentage'>
  size?: 'md' | 'lg'
}

export const ProductPrice = ({ product, size = 'md' }: ProductPriceProps) => {
  const discounted = hasDiscount(product)

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className={cn('font-bold text-slate-900', size === 'lg' ? 'text-3xl' : 'text-xl')}>
          {formatPrice(product.price)}
        </span>
        {discounted && (
          <Badge variant="danger" size="sm">
            −{getDiscountPercent(product)}%
          </Badge>
        )}
      </div>
      {discounted && (
        <span className={cn('text-slate-500', size === 'lg' ? 'text-base' : 'text-sm')}>
          Со скидкой: {formatPrice(getDiscountedPrice(product))}
        </span>
      )}
    </div>
  )
}
