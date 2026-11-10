import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const options = [
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'rating-desc', label: 'Рейтинг: по убыванию' },
  { value: 'title-asc', label: 'Название: А → Я' },
]

const meta = {
  title: 'UI/Select',
  component: Select,
  args: { label: 'Сортировка', options },
  argTypes: {
    selectSize: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPlaceholder: Story = {
  args: { placeholder: 'Выберите вариант', defaultValue: '' },
}

export const WithError: Story = {
  args: { placeholder: 'Выберите вариант', defaultValue: '', error: 'Обязательное поле' },
}

export const WithDisabledOption: Story = {
  args: {
    options: [...options.slice(0, 2), { ...options[2]!, disabled: true }, options[3]!],
    hint: 'Один из вариантов недоступен',
  },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Select {...args} selectSize="sm" label="Small" />
      <Select {...args} selectSize="md" label="Medium" />
      <Select {...args} selectSize="lg" label="Large" />
    </div>
  ),
}
