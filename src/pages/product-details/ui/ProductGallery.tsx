import { useState } from 'react'
import { cn } from '@/shared/lib'

interface ProductGalleryProps {
  title: string
  images: readonly string[]
}

export const ProductGallery = ({ title, images }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex] ?? images[0]

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square overflow-hidden rounded-xl bg-slate-100">
        {activeImage && <img src={activeImage} alt={title} className="size-full object-contain" />}
      </div>

      {images.length > 1 && (
        <ul className="grid grid-cols-4 gap-2 sm:grid-cols-5" aria-label="Галерея изображений">
          {images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Показать изображение ${index + 1} из ${images.length}`}
                aria-current={index === activeIndex}
                className={cn(
                  'aspect-square w-full overflow-hidden rounded-lg border-2 bg-slate-100 transition-colors',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
                  index === activeIndex
                    ? 'border-brand-600'
                    : 'border-transparent hover:border-slate-300',
                )}
              >
                <img src={image} alt="" loading="lazy" className="size-full object-contain" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
