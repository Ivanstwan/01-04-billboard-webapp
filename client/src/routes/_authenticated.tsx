import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

const Component = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Component,
});
