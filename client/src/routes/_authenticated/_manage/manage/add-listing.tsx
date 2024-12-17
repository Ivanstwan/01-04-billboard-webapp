import { createFileRoute } from '@tanstack/react-router';

import { ContentLayout } from '@/components/layout/content-layout';
import { AddListing } from '@/features/listing/component/add-listing';

export const Route = createFileRoute(
  '/_authenticated/_manage/manage/add-listing',
)({
  component: () => <AddListing />,
});
