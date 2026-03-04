export interface IApiError {
  response?: {
    data?: {
      message?: string;
      error?: {
        message?: string;
      };
    };
  };
  message?: string; // Standard Error property
}
