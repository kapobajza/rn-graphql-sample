export interface Paginate<TModel = unknown> {
  page?: number;
  perPage?: number;
  sortField?: keyof TModel;
  sortOrder?: 'ASC' | 'DESC';
}
