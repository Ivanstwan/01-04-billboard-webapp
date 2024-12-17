import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/listing/public-listing')({
  component: () => <div>Hello /_authenticated/listing/public-listing!</div>
})