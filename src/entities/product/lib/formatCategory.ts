/** `mens-shirts` → `Mens shirts` */
export const formatCategory = (category: string): string => {
  const text = category.replace(/-/g, ' ').trim()
  return text.charAt(0).toUpperCase() + text.slice(1)
}
