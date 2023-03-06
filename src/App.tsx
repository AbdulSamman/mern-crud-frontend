import { NavLink, Navigate, Routes, Route } from "react-router-dom";
import "./App.scss";
import { PageLogout } from "./pages/PageLogout";
import { PageLogin } from "./pages/PageLogin";
import { PageWelcome } from "./pages/PageWelcome";

import { useContext } from "react";
import { AppContext } from "./AppContext";

function App() {
  const { adminIsLoggedIn } = useContext(AppContext);
  return (
    <div className="App">
      <h1>Book Info Site</h1>

      <nav>
        <NavLink to="/">Welcome</NavLink>
        {!adminIsLoggedIn ? (
          <NavLink to="/login">Login</NavLink>
        ) : (
          <NavLink to="/logout">Logout</NavLink>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<PageWelcome />} />
        <Route path="login" element={<PageLogin />} />
        <Route path="logout" element={<PageLogout />} />
        <Route path="/" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
