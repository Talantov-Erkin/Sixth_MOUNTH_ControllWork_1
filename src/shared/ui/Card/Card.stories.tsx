import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '../Badge'
import { Button } from '../Button'
import { Card } from './Card'

const meta = {
  title: 'UI/Card',
  component: Card,
  argTypes: {
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
    interactive: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    children: (
      <div className="flex flex-col gap-3">
        <Badge variant="brand" size="sm" className="self-start">Новинка</Badge>
        <h3 className="text-lg font-semibold">Заголовок карточки</h3>
        <p className="text-sm text-slate-600">Короткое описание содержимого карточки.</p>
        <Button size="sm">Подробнее</Button>
      </div>
    ),
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  args: { interactive: true },
}

export const Paddings: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(['none', 'sm', 'md', 'lg'] as const).map((padding) => (
        <Card key={padding} {...args} padding={padding}>
          <span className="block bg-brand-50 text-sm">padding: {padding}</span>
        </Card>
      ))}
    </div>
  ),
}
