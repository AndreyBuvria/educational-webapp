export interface PaginationData {
  count: number,
  next: string | null,
  previous: string | null,
  length: number
}

export interface BasePaginationResponse<T> extends PaginationData {
  results: T
}

