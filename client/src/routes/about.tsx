import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  const { id } = Route.useParams();
  return <div className="p-2">Hello from About!</div>;
}
