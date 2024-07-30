import { AuthLayout } from "@/components/layouts/auth-layout";
import { RegisterForm } from "../../../../features/auth/register-form";
export const RegisterRouter = () => {
  return (
    <AuthLayout>
      <h2>Sign up</h2>
      <RegisterForm />
    </AuthLayout>
  );
};
