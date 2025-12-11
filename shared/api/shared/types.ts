export interface PaginationWrapper<T> {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  items: T[];
}

export interface PaginationPayload {
  page: number;
  perPage: number;
}
