import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

export const PageLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  });
  return <></>;
};
