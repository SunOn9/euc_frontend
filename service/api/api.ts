export type ApiResponse<T = any> = {
  statusCode: number
  message: string
  payload?: T
  errorCode?: string | undefined
  extraData?: any
}
