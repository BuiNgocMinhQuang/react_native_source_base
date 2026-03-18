import axios from 'axios';
import Config from 'react-native-config';

const API_BASE_URL = Config.API_URL || 'https://httpbin.org';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export type ApiErrorShape = {
  message: string;
  status?: number;
  raw?: unknown;
};

export const toApiError = (error: unknown): ApiErrorShape => {
  if (axios.isAxiosError(error)) {
    return {
      message:
        error.response?.data?.message ||
        error.message ||
        'Something went wrong',
      status: error.response?.status,
      raw: error.toJSON(),
    };
  }

  return {
    message: 'Unexpected error',
    raw: error,
  };
};

