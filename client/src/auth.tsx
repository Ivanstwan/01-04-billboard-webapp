import * as React from 'react';
import { sleep } from './lib/utils';
import jwtDecode from 'jwt-decode';
import api from './lib/api-client';
import { redirect } from '@tanstack/react-router';
import { toast } from 'sonner';

export interface AuthContext {
  isAuthenticated: boolean;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  user: DecodedJwt | null;
  isTokenExpired: () => boolean;
  refreshToken: () => Promise<string>;
  checkAccessToken: () => Promise<void>;
}

export type DecodedJwt = {
  email: string;
  username?: string;
  exp: number;
  iat: number;
  image?: string;
};

const AuthContext = React.createContext<AuthContext | null>(null);

const key = 'access_token';

function getStoredUser() {
  const token = localStorage.getItem(key);

  if (!token) return null;

  try {
    const decodedToken = jwtDecode<DecodedJwt>(token);

    return decodedToken || null;
  } catch (error) {
    toast.error('Failed to decode token');
    return null;
  }
}

function setStoredUser(token: string | null) {
  if (token) {
    localStorage.setItem(key, token);
  } else {
    localStorage.removeItem(key);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<DecodedJwt | null>(getStoredUser());

  const isAuthenticated = !!user;

  const refreshToken = async () => {
    try {
      const response = await api.get(
        'http://localhost:8000/api/auth/refreshtoken',
      );

      const { accessToken } = response.data;
      setStoredUser(accessToken);
      return accessToken;
    } catch (error) {
      logout();
      toast.error('Session expired. Please sign in');
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  };

  const isTokenExpired = () => {
    const token = localStorage.getItem(key);
    if (!token) return true; // Treat missing token as expired

    const decodedToken = jwtDecode<DecodedJwt>(token);
    const currentTime = Math.floor(Date.now() / 1000);

    return decodedToken.exp < currentTime;
  };

  const checkAccessToken = async () => {
    const token = localStorage.getItem(key);

    try {
      await api.get('http://localhost:8000/api/auth/checkaccesstoken', {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      toast.error('Session expired');
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  };

  const logout = React.useCallback(async () => {
    await sleep(250);

    setStoredUser(null);
    setUser(null);
    toast.success('Logged out');
  }, []);

  const login = React.useCallback(async (token: string) => {
    await sleep(500);

    setStoredUser(token);
    setUser(getStoredUser());
    toast.success('Login successful');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isTokenExpired,
        refreshToken,
        checkAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
