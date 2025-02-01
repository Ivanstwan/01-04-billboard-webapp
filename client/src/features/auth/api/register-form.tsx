import { api } from '@/lib/api-client';

export const registerUser = async (email: string) => {
  const response = await api.post('/api/auth/register', {
    email,
  });

  return response.data;
};
