export interface ApiError {
  errorData: ErrorData[];
  status: number;
  timestamp: string;
}

export interface ErrorData {
  code: string;
  field: string;
  message: string;
}
