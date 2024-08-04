import axios, { AxiosResponse } from 'axios';

export const registerUser = async (
  email: string,
): Promise<AxiosResponse<any>> => {
  console.log(email, '[email');

  const response = await axios.post('http://localhost:8000/api/auth/register', {
    email,
  });
  console.log(response, '[response]');

  return response.data;
};
