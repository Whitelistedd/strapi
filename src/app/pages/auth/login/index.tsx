import { AuthLayout } from '@/components/layouts/auth-layout';
import { LoginForm } from '@/features/auth/login-form';

export const LoginRoute = () => {
  return (
    <AuthLayout>
      <h2>Sign in</h2>
      <LoginForm />
    </AuthLayout>
  );
};
