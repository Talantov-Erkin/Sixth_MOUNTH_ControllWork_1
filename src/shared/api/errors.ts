import { isAxiosError } from 'axios'

export const isNotFoundError = (error: unknown): boolean =>
  isAxiosError(error) && error.response?.status === 404

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return 'Сервер отвечает слишком долго. Попробуйте ещё раз.'
    }
    if (!error.response) {
      return 'Нет соединения с сервером. Проверьте интернет и повторите попытку.'
    }
    return `Сервер вернул ошибку (${error.response.status}).`
  }
  return 'Не удалось загрузить данные. Попробуйте ещё раз.'
}
