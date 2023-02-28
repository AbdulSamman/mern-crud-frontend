import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Helmet } from "react-helmet";

export const PageWelcome = () => {
  const { appTitle } = useContext(AppContext);
  return (
    <div>
      <Helmet>
        <title>{appTitle} - Welcome</title>
      </Helmet>
      <p>welcome to the Welcome page</p>
    </div>
  );
};
