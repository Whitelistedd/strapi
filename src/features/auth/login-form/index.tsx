import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import styles from "./login-form.module.scss";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { LoginFieldType } from "./login-form.types";
import { authApi } from "@/api/auth";
import { useAppDispatch } from "@/stores/store";
import { setUser } from "@/stores/slices/user";
import { setToken } from "@/helpers/tokens";

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFieldType>();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginFieldType) => {
    try {
      const res = await authApi.login(data.email, data.password);
      setToken(res.data.jwt);
      dispatch(setUser(res.data.user));
    } catch (err) {
      setError("root", { message: "Error occurred when trying to register" });
    }
  };

  return (
    <form className={styles.form}>
      <Input
        placeholder="Email"
        control={control}
        name="email"
        error={errors.email?.message}
        rules={{
          required: {
            value: true,
            message: "Email is required",
          },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        }}
      />
      <Input
        placeholder="Password"
        control={control}
        name="password"
        error={errors.password?.message}
        rules={{
          required: {
            value: true,
            message: "Password is required",
          },
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        secure
      />
      {errors.root?.message && <span>{errors.root.message}</span>}
      <Button onClick={() => handleSubmit(onSubmit)()} type="default">
        Submit
      </Button>
      <p>
        Want to create an account? <Link to="/">Sign up</Link>
      </p>
    </form>
  );
};
