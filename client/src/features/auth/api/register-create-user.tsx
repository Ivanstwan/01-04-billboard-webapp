import api from '@/lib/api-client';

export const registerCreateUser = async (password: string, token: string) => {
  const response = await api.post(
    'http://localhost:8000/api/auth/register/create-user',
    {
      password,
      token,
    },
  );

  return response.data;
};
