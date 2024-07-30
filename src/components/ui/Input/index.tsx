/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input as AntdInput, InputProps } from "antd";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import styles from "./Input.module.scss";

interface Props extends InputProps {
  control: Control<any>; // used "any" because there can be many types of fields
  name: string;
  error?: string;
  rules?:
    | Omit<
        RegisterOptions<any, string>, // used "any" because there can be many types of fields
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
  secure?: boolean;
}

export const Input = ({
  control,
  name,
  error,
  rules,
  secure,
  ...props
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { name, onChange, onBlur, value } }) => (
        <>
          {secure ? (
            <AntdInput.Password
              {...props}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          ) : (
            <AntdInput
              {...props}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          <span className={styles.error}>{error}</span>
        </>
      )}
    />
  );
};
