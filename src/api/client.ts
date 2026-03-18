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

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiErrorShape };

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

/**
 * Wraps async API calls into a typed result instead of throwing.
 * Prefer this in screens/features to keep error handling consistent.
 */
export async function apiCall<T>(fn: () => Promise<T>): Promise<ApiResult<T>> {
  try {
    const data = await fn();
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toApiError(err) };
  }
}

// Minimal interceptors scaffold.
// Add auth tokens / request ids here when the app introduces authentication.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

