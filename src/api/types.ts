export type ApiResponse<T> = {
  data: T;
  success: number;
  message: string;
};

export type PaginateQuery<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};
