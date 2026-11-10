import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  /** id избранных товаров; дубликаты не допускаются */
  ids: number[]
  add: (id: number) => void
  remove: (id: number) => void
  toggle: (id: number) => void
  clear: () => void
}

export const FAVORITES_STORAGE_KEY = 'catalog:favorites'

/** Данные из localStorage нельзя считать доверенными: оставляем только уникальные целые числа. */
const parsePersistedIds = (persisted: unknown): number[] => {
  if (typeof persisted !== 'object' || persisted === null || !('ids' in persisted)) return []
  const { ids } = persisted
  if (!Array.isArray(ids)) return []
  const valid = ids.filter((id): id is number => typeof id === 'number' && Number.isInteger(id))
  return [...new Set(valid)]
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      ids: [],
      add: (id) => set((state) => (state.ids.includes(id) ? state : { ids: [...state.ids, id] })),
      remove: (id) => set((state) => ({ ids: state.ids.filter((item) => item !== id) })),
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((item) => item !== id)
            : [...state.ids, id],
        })),
      clear: () => set({ ids: [] }),
    }),
    {
      name: FAVORITES_STORAGE_KEY,
      version: 1,
      partialize: (state) => ({ ids: state.ids }),
      merge: (persisted, current) => ({ ...current, ids: parsePersistedIds(persisted) }),
    },
  ),
)

export const useFavoriteIds = (): number[] => useFavoritesStore((state) => state.ids)
export const useFavoritesCount = (): number => useFavoritesStore((state) => state.ids.length)
export const useIsFavorite = (id: number): boolean =>
  useFavoritesStore((state) => state.ids.includes(id))
export const useToggleFavorite = (): ((id: number) => void) =>
  useFavoritesStore((state) => state.toggle)
