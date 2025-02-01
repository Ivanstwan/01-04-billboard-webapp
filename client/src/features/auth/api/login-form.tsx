import { api } from '@/lib/api-client';
import { Login } from '../components/login-form';

export const loginUser = async ({ email, password }: Login) => {
  const response = await api.post('/api/auth/login', {
    email,
    password,
  });

  return response.data;
};
