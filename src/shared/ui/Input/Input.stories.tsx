import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchIcon } from '../icons'
import { Input } from './Input'

const meta = {
  title: 'UI/Input',
  component: Input,
  args: { label: 'Название', placeholder: 'Введите текст' },
  argTypes: {
    inputSize: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHint: Story = {
  args: { hint: 'Поиск не учитывает регистр' },
}

export const WithLeftAddon: Story = {
  args: { type: 'search', label: 'Поиск', leftAddon: <SearchIcon /> },
}

export const WithError: Story = {
  args: { defaultValue: '-5', error: 'Значение не может быть отрицательным' },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Недоступно' },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Input {...args} inputSize="sm" label="Small" />
      <Input {...args} inputSize="md" label="Medium" />
      <Input {...args} inputSize="lg" label="Large" />
    </div>
  ),
}
