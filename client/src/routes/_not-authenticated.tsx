import { createFileRoute, Outlet } from '@tanstack/react-router';

const Component = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/_not-authenticated')({
  beforeLoad: async ({ context }) => {
    console.log(context, '[context] not auth');
  },
  component: Component,
});
