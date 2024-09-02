import { AuthContext } from '@/auth';
import {
  createFileRoute,
  Outlet,
  redirect,
  RouteContext,
} from '@tanstack/react-router';

// assign type, because somehow type for 'context.auth' not showing
type CustomContext = RouteContext & {
  auth: AuthContext;
};

const Component = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    const auth = (context as CustomContext).auth; // Cast context to CustomContext

    // check if there are user object from token
    if (!auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }

    // check if the token jwt expired,
    // if expired then refresh token
    if (auth.isTokenExpired()) {
      await auth.refreshToken();

      if (auth.isTokenExpired()) {
        // Redirect to login if the token is still expired
        throw redirect({
          to: '/login',
          search: {
            redirect: location.href,
          },
        });
      }
    }
  },
  component: Component,
});
