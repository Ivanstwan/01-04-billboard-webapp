import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

const Component = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/_not-authenticated')({
  beforeLoad: async ({ context, location }) => {
    // redirect if user already logged in
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: Component,
});
