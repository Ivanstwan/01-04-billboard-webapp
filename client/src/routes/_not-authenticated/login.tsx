import { createFileRoute } from '@tanstack/react-router';

import { LoginForm } from '@/features/auth/components/login-form';
import { EmptyLayout } from '@/components/layout/empty-layout';

export const Route = createFileRoute('/_not-authenticated/login')({
  component: () => (
    <EmptyLayout title="login" showTitle={false}>
      <div className="flex min-h-svh flex-col items-center justify-center p-6">
        <LoginForm />
      </div>
    </EmptyLayout>
  ),
});
