import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Helmet } from "react-helmet";

export const PageLogin = () => {
  const { appTitle } = useContext(AppContext);
  return (
    <div>
      <Helmet>
        <title>{appTitle} - Login</title>
      </Helmet>
      <p>welcome to the Login page</p>
    </div>
  );
};
