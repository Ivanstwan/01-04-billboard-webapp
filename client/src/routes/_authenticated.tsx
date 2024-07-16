import { createFileRoute, Outlet } from '@tanstack/react-router';

const Component = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {},
  component: Component,
});
