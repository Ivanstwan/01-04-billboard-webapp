import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_example/example')({
  component: () => <div>Hello /_example/example!</div>,
});
