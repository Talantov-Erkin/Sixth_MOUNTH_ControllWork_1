import { createBrowserRouter } from 'react-router-dom'
import { CatalogPage } from '@/pages/catalog'
import { FavoritesPage } from '@/pages/favorites'
import { NotFoundPage } from '@/pages/not-found'
import { ProductDetailsPage } from '@/pages/product-details'
import { ROUTES } from '@/shared/config'
import { RootLayout } from './RootLayout'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: ROUTES.catalog, element: <CatalogPage /> },
      { path: ROUTES.productPattern, element: <ProductDetailsPage /> },
      { path: ROUTES.favorites, element: <FavoritesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
