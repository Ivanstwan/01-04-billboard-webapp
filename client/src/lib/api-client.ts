import Axios, { InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

const api = Axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(authRequestInterceptor);

export default api;
