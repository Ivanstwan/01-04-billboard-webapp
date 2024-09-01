import { createFileRoute } from '@tanstack/react-router';

import { EmptyLayout } from '@/components/layout/empty-layout';
import RegisterForm from '@/features/auth/components/register-form';

export const Route = createFileRoute('/_not-authenticated/register/')({
  component: () => (
    <EmptyLayout title="login" showTitle={false}>
      <div className="flex min-h-svh flex-col items-center justify-center p-6">
        <RegisterForm />
      </div>
    </EmptyLayout>
  ),
});
