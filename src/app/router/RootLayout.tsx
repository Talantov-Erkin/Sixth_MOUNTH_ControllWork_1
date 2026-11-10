import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from '@/widgets/header'

export const RootLayout = () => (
  <div className="flex min-h-dvh flex-col">
    <a
      href="#main"
      className="sr-only rounded-lg bg-white px-4 py-2 font-medium text-brand-700 shadow focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50"
    >
      Перейти к содержимому
    </a>
    <Header />
    <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Outlet />
    </main>
    <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
      ShopCatalog · данные предоставлены DummyJSON
    </footer>
    <ScrollRestoration />
  </div>
)
