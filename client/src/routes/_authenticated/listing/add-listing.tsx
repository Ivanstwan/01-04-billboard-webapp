import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/listing/add-listing')({
  component: () => <div>Hello /listing/add-listing!</div>
})