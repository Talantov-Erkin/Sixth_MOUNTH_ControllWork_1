type ClassValue = string | false | null | undefined

/** Склеивает классы, пропуская «пустые» значения. */
export const cn = (...values: ClassValue[]): string => values.filter(Boolean).join(' ')
