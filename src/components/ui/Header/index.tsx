import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { useFetchUserQuery } from "@/api/auth";
import { Button } from "antd";
import { getToken, removeToken, setToken } from "@/helpers/tokens";

export const Header = () => {
  const { data, refetch } = useFetchUserQuery(null);

  const handleLogout = () => {
    setToken("");
    removeToken();
    refetch();
  };

  console.log(getToken());

  return (
    <header className={styles.header}>
      <Link to={"/"}>main page</Link>
      {getToken() ? (
        <>
          <Link to={"/cart"}>cart page</Link>
          <Button onClick={() => handleLogout()}>logout</Button>
        </>
      ) : (
        <Link to={"/login"}>login</Link>
      )}
    </header>
  );
};
