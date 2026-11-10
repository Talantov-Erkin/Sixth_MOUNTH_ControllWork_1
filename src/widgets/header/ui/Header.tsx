import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useFavoritesCount } from '@/features/toggle-favorite'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Badge, CloseIcon, HeartIcon, MenuIcon } from '@/shared/ui'

const NAV_ID = 'primary-navigation'

const linkClassName = ({ isActive }: { isActive: boolean }): string =>
  cn(
    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  )

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const favoritesCount = useFavoritesCount()

  const closeMenu = () => setIsOpen(false)

  // Escape закрывает меню и возвращает фокус на кнопку-бургер
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false)
      burgerRef.current?.focus()
    }
  }

  return (
    <header
      onKeyDown={handleKeyDown}
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to={ROUTES.catalog}
          onClick={closeMenu}
          className="rounded-md text-xl font-bold tracking-tight text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          Shop<span className="text-slate-900">Catalog</span>
        </Link>

        <button
          ref={burgerRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls={NAV_ID}
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 md:hidden"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <nav
          id={NAV_ID}
          aria-label="Основная навигация"
          className={cn(
            isOpen ? 'block' : 'hidden',
            'absolute inset-x-0 top-full border-b border-slate-200 bg-white p-3 shadow-md',
            'md:static md:block md:border-0 md:bg-transparent md:p-0 md:shadow-none',
          )}
        >
          <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
            <li>
              <NavLink to={ROUTES.catalog} end onClick={closeMenu} className={linkClassName}>
                Каталог
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.favorites} onClick={closeMenu} className={linkClassName}>
                <HeartIcon className="size-4" />
                Избранное
                <Badge variant="brand" size="sm" aria-hidden>
                  {favoritesCount}
                </Badge>
                <span className="sr-only">, товаров: {favoritesCount}</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
