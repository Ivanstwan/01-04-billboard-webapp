import api from '@/lib/api-client';

export const registerUser = async (email: string) => {
  const response = await api.post('http://localhost:8000/api/auth/register', {
    email,
  });

  return response.data;
};
