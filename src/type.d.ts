export type APIResponse<T> = {
  error: string;
  statusCode: number;
  message: string;
  data: T;
};
