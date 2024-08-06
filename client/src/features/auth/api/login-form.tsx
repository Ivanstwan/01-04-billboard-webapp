import { Login } from '../components/login-form';
import api from '@/lib/api-client';

export const loginUser = async ({ email, password }: Login) => {
  const response = await api.post('http://localhost:8000/api/auth/login', {
    email,
    password,
  });

  return response.data;
};
