import { useMemo } from 'react'
import { ALL_CATEGORIES, formatCategory } from '@/entities/product'
import type { ProductCategory, ProductFilters } from '@/entities/product'
import { Button, Input, Select } from '@/shared/ui'
import type { SelectOption } from '@/shared/ui'
import { hasActiveFilters, isPriceRangeInvalid } from '../model/filterProducts'

interface ProductFilterProps {
  categories: readonly ProductCategory[]
  value: ProductFilters
  onChange: (value: ProductFilters) => void
  onReset: () => void
}

/** Пустая строка или некорректное число → `null` (граница не задана). */
const parsePrice = (raw: string): number | null => {
  if (raw.trim() === '') return null
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}

export const ProductFilter = ({ categories, value, onChange, onReset }: ProductFilterProps) => {
  const options = useMemo<SelectOption[]>(
    () => [
      { value: ALL_CATEGORIES, label: 'Все категории' },
      ...categories.map((category) => ({ value: category, label: formatCategory(category) })),
    ],
    [categories],
  )

  const rangeError = isPriceRangeInvalid(value)

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_9rem_9rem_auto] lg:items-start">
      <Select
        label="Категория"
        options={options}
        value={value.category}
        onChange={(event) => onChange({ ...value, category: event.target.value })}
      />
      {/* На мобильных обе границы цены стоят в одной строке; с sm и выше — отдельные ячейки сетки */}
      <div className="grid grid-cols-2 gap-4 sm:contents">
        <Input
          type="number"
          inputMode="decimal"
          min={0}
          label="Цена от, $"
          placeholder="0"
          value={value.minPrice ?? ''}
          onChange={(event) => onChange({ ...value, minPrice: parsePrice(event.target.value) })}
        />
        <Input
          type="number"
          inputMode="decimal"
          min={0}
          label="Цена до, $"
          placeholder="∞"
          value={value.maxPrice ?? ''}
          error={rangeError ? 'Меньше минимальной' : undefined}
          onChange={(event) => onChange({ ...value, maxPrice: parsePrice(event.target.value) })}
        />
      </div>
      <Button
        variant="ghost"
        className="sm:col-span-2 lg:col-span-1 lg:mt-[1.625rem]"
        disabled={!hasActiveFilters(value)}
        onClick={onReset}
      >
        Сбросить фильтры
      </Button>
    </div>
  )
}
