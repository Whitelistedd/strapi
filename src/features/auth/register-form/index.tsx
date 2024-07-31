import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import styles from "./register-form.module.scss";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterFieldType } from "./register-form.types";
import { useFetchUserQuery, useRegisterMutation } from "@/api/auth";
import { setToken } from "@/helpers/tokens";

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFieldType>();
  const [register, { isLoading }] = useRegisterMutation();
  const { refetch } = useFetchUserQuery(null);
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFieldType) => {
    try {
      const res = await register({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      if (res?.data?.jwt) {
        setToken(res?.data?.jwt);
        refetch();
        navigate("/");
      } else {
        setError("root", { message: "Error occurred when trying to register" });
      }
    } catch (err) {
      setError("root", { message: "Error occurred when trying to register" });
    }
  };

  return (
    <form className={styles.form}>
      <Input
        placeholder="Username"
        control={control}
        name="username"
        error={errors.username?.message}
        rules={{
          minLength: {
            value: 4,
            message: "Username must be at least 4 characters",
          },
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: "Username can only contain letters and numbers",
          },
          required: {
            value: true,
            message: "Username is required",
          },
        }}
      />
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
        secure
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
      />
      {errors.root?.message && (
        <span className={styles.error}>{errors.root.message}</span>
      )}
      {isLoading && <span>Loading...</span>}
      <Button onClick={() => handleSubmit(onSubmit)()} type="default">
        Submit
      </Button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};
