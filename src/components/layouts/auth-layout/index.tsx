import styles from './auth-layout.module.scss';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const AuthLayout = ({ children }: Props) => {
  return <main className={styles.container}>{children}</main>;
};
