import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Helmet } from "react-helmet";

export const PageInfo = () => {
  const { appTitle } = useContext(AppContext);
  return (
    <div>
      <Helmet>
        <title>{appTitle} - Info</title>
      </Helmet>
      <p>welcome to the Info page</p>
    </div>
  );
};
