import { Helmet } from "react-helmet";
import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageAbout = () => {
  const { appTitle } = useContext(AppContext);
  return (
    <div>
      <Helmet>
        <title>{appTitle} - About</title>
      </Helmet>
      <p>welcome to the About page</p>
    </div>
  );
};
