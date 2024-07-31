import styles from "./auth-layout.module.scss";
import { useNavigate } from "react-router-dom";
import { getToken } from "@/helpers/tokens";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const AuthLayout = ({ children }: Props) => {
  const navigate = useNavigate();

  if (getToken()) navigate("/");

  return <main className={styles.container}>{children}</main>;
};
