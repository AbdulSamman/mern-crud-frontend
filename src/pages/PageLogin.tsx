import { useContext, useRef } from "react";
import { AppContext } from "../AppContext";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export const PageLogin = () => {
  const { appTitle, password, setPassword, loginAsAdmin, adminIsLoggedIn } =
    useContext(AppContext);

  const navigate = useNavigate();
  const passwordRef = useRef() as React.RefObject<HTMLInputElement>;

  const loginAndReact = () => {
    //loginAsAdmin onSuccess(),onFailure()
    loginAsAdmin(
      () => navigate("/"),
      () => {
        if (passwordRef.current !== null) {
          passwordRef.current.focus();
        }
      }
    );
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      loginAndReact();
    }
  };

  return (
    <div className="pageLogin">
      <Helmet>
        <title>{appTitle} - Login</title>
      </Helmet>
      {!adminIsLoggedIn && (
        <div>
          Identify as admin:
          <input
            type="text"
            ref={passwordRef}
            autoFocus
            value={password}
            onKeyDown={handleKeyDown}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={loginAndReact}
            type="button"
            disabled={password.trim() === ""}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};
