import type { Product } from '../model/types'

type PriceFields = Pick<Product, 'price' | 'discountPercentage'>

/** Скидка показывается, только если после округления она ≥ 1%. */
export const getDiscountPercent = ({ discountPercentage }: Pick<Product, 'discountPercentage'>): number =>
  Math.round(discountPercentage)

export const hasDiscount = (product: Pick<Product, 'discountPercentage'>): boolean =>
  getDiscountPercent(product) > 0

export const getDiscountedPrice = ({ price, discountPercentage }: PriceFields): number =>
  Math.round(price * (1 - discountPercentage / 100) * 100) / 100
