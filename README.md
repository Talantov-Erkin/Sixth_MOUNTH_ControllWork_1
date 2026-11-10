# ShopCatalog — каталог товаров (React + TypeScript + FSD)

Промежуточная контрольная работа «Каталог товаров» (вариант 1).
Стек: React 19, TypeScript, Vite, Tailwind CSS v4, React Router, TanStack React Query, Axios, Zustand, Storybook.
Данные: [DummyJSON](https://dummyjson.com). Поиск, фильтрация и сортировка выполняются **на клиенте**.

## Запуск

```bash
npm install
npm run dev              # приложение: http://localhost:5173
npm run storybook        # Storybook:  http://localhost:6006
```

## Скрипты

| Команда                   | Что делает                          |
| ------------------------- | ----------------------------------- |
| `npm run dev`             | dev-сервер Vite                     |
| `npm run build`           | `tsc -b` + production-сборка        |
| `npm run typecheck`       | проверка типов                      |
| `npm run lint`            | ESLint (в т.ч. правила границ FSD)  |
| `npm run storybook`       | запуск Storybook                    |
| `npm run build-storybook` | статическая сборка Storybook        |

## Архитектура (Feature-Sliced Design)

```text
src/
├── app/         провайдеры (React Query), роутер, глобальные стили, App.tsx
├── pages/       catalog · product-details · favorites · not-found
├── widgets/     header · product-grid
├── features/    product-search · product-filter · product-sort · toggle-favorite
├── entities/    product (api · model · lib · ui)
└── shared/      api · config · lib · ui (UI-kit) · assets
```

Правила импортов проверяет ESLint (`no-restricted-imports`):
слой импортирует только нижележащие слои; слайсы одного слоя не зависят друг от друга;
слайс доступен снаружи только через `index.ts`.

## UI-kit (`src/shared/ui`)

Button, Input, Select, Card, Badge, Spinner, EmptyState (+ Skeleton, ErrorState и иконки).
Истории Storybook лежат рядом с компонентами (`*.stories.tsx`).

## Принятые решения

- Фильтр и сортировка по цене используют поле `price` товара (цена до скидки, как отдаёт API);
  цена со скидкой показывается отдельной строкой в карточке и на странице товара.
- Сортировка по умолчанию — «Рейтинг: по убыванию».
- В избранном хранятся только `id` товаров (`localStorage`, ключ `catalog:favorites`);
  сами товары берутся из кеша React Query.
