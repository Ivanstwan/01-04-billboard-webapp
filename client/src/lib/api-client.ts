import Axios, { InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

const api = Axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

const authApi = Axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
});

authApi.interceptors.request.use(authRequestInterceptor);

export { api, authApi };
