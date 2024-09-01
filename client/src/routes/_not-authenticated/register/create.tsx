import { createFileRoute } from '@tanstack/react-router';

import { EmptyLayout } from '@/components/layout/empty-layout';
import RegisterCreateUser from '@/features/auth/components/register-create-user';

export const Route = createFileRoute('/_not-authenticated/register/create')({
  component: () => (
    <EmptyLayout title="login" showTitle={false}>
      <div className="flex min-h-svh flex-col items-center justify-center p-6">
        <RegisterCreateUser />
      </div>
    </EmptyLayout>
  ),
});
