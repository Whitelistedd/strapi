import { useFetchUserQuery } from "@/api/auth";
import styles from "./auth-layout.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const AuthLayout = ({ children }: Props) => {
  const { data } = useFetchUserQuery(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.id) navigate("/");
  }, [data]);

  console.log(data);

  return <main className={styles.container}>{children}</main>;
};
