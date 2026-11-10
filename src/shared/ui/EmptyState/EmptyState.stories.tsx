import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { HeartIcon, SearchIcon } from '../icons'
import { EmptyState } from './EmptyState'

const meta = {
  title: 'UI/EmptyState',
  component: EmptyState,
  args: {
    title: 'Ничего не найдено',
    description: 'Попробуйте изменить поисковый запрос или сбросить фильтры.',
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAction: Story = {
  args: {
    icon: <SearchIcon />,
    action: <Button>Сбросить фильтры</Button>,
  },
}

export const Favorites: Story = {
  args: {
    icon: <HeartIcon />,
    title: 'В избранном пока пусто',
    description: 'Нажмите на сердечко у товара, чтобы сохранить его здесь.',
    action: <Button variant="outline">Перейти в каталог</Button>,
  },
}

export const TitleOnly: Story = {
  args: { description: undefined },
}
