import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

const exampleLink = [
  'authenticate-01',
  'authenticate-02',
  'authenticate-03',
  'dashboard-03',
  'dashboard-04',
  'dashboard-05',
  'dashboard-06',
];

const Component = () => {
  return (
    <>
      <div className="flex overflow-auto sm:gap-4 sm:py-4 sm:pl-16">
        {exampleLink.map((item) => (
          <Link to={`/${item}`}>{item}</Link>
        ))}
      </div>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Outlet />
      </div>
    </>
  );
};

export const Route = createFileRoute('/_example')({
  component: Component,
});
