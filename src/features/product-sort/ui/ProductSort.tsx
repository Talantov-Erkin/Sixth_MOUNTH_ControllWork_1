import type { SortOption } from '@/entities/product'
import { Select } from '@/shared/ui'
import { SORT_OPTIONS, isSortOption } from '../model/sortProducts'

interface ProductSortProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export const ProductSort = ({ value, onChange }: ProductSortProps) => (
  <Select
    label="Сортировка"
    options={SORT_OPTIONS}
    value={value}
    onChange={(event) => {
      const next = event.target.value
      if (isSortOption(next)) onChange(next)
    }}
  />
)
