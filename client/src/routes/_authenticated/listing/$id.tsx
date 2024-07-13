import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/listing/$id')({
  component: () => <Testing></Testing>,
});

const Testing = () => {
  const { id } = Route.useParams();

  return <div>Teting {id}</div>;
};

export default Testing;
