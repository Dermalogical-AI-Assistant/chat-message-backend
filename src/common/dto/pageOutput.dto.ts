export class PaginatedOutputDto<T> {
  data: T[];
  meta: {
    page: number;
    total: number;
    perPage: number;
  };
}