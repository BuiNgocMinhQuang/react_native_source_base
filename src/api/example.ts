import { apiClient } from './client';

export type ExampleEchoResponse = {
  data: {
    name: string;
    email: string;
  };
};

export const submitExampleForm = async (payload: {
  name: string;
  email: string;
}) => {
  // Using httpbin.org/post-style echo as a safe default when API_URL is not set.
  const response = await apiClient.post<ExampleEchoResponse>('/anything/form', {
    data: payload,
  });
  return response.data;
};

