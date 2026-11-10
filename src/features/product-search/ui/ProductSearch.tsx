import { Input, SearchIcon } from '@/shared/ui'

interface ProductSearchProps {
  value: string
  onChange: (value: string) => void
}

export const ProductSearch = ({ value, onChange }: ProductSearchProps) => (
  <Input
    type="search"
    label="Поиск по названию"
    placeholder="Например, phone или mascara"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    leftAddon={<SearchIcon />}
    autoComplete="off"
  />
)
