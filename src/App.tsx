import { NavLink, Navigate, Routes, Route } from "react-router-dom";

import "./App.scss";
import { PageAbout } from "./pages/PageAbout";
import { PageInfo } from "./pages/PageInfo";
import { PageWelcome } from "./pages/PageWelcome";

function App() {
  return (
    <div className="App">
      <h1>Book Info Site</h1>

      <nav>
        <NavLink to="/">Welcome</NavLink>
        <NavLink to="/info">Info</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<PageWelcome />} />
        <Route path="info" element={<PageInfo />} />
        <Route path="about" element={<PageAbout />} />
        <Route path="/" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
