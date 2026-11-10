export const ROUTES = {
  catalog: '/',
  favorites: '/favorites',
  /** Шаблон для React Router */
  productPattern: '/products/:id',
  /** Ссылка на конкретный товар */
  product: (id: number): string => `/products/${id}`,
} as const
