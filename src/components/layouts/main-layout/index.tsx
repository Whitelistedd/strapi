import styles from "./main-layout.module.scss";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const MainLayout = ({ children }: Props) => {
  return <main className={styles.container}>{children}</main>;
};
