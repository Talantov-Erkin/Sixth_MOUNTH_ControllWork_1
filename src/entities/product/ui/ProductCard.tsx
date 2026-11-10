import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/config'
import { Badge, Card } from '@/shared/ui'
import { formatCategory } from '../lib/formatCategory'
import type { Product } from '../model/types'
import { ProductPrice } from './ProductPrice'
import { ProductRating } from './ProductRating'

interface ProductCardProps {
  product: Product
  /** Слот для действия над товаром (например, кнопки «В избранное») — собирается на верхних слоях */
  action?: ReactNode
}

export const ProductCard = ({ product, action }: ProductCardProps) => {
  const href = ROUTES.product(product.id)

  return (
    <Card as="article" padding="none" interactive className="flex h-full flex-col overflow-hidden">
      <div className="relative bg-slate-100">
        <Link to={href} tabIndex={-1} aria-hidden className="block aspect-square">
          <img
            src={product.thumbnail}
            alt=""
            loading="lazy"
            className="size-full object-contain"
          />
        </Link>
        {action && <div className="absolute top-2 right-2">{action}</div>}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Badge variant="neutral" size="sm" className="self-start">
          {formatCategory(product.category)}
        </Badge>
        <h3 className="line-clamp-2 min-h-12 text-base leading-6 font-semibold text-slate-900">
          <Link
            to={href}
            className="rounded-sm hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {product.title}
          </Link>
        </h3>
        <ProductRating rating={product.rating} />
        <div className="mt-auto pt-2">
          <ProductPrice product={product} />
        </div>
      </div>
    </Card>
  )
}
