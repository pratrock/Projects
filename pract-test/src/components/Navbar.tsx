import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="navbar">
      <div className="nav-left">
        <div>
          <Link to="/todo" className="navbar-link">
            Todo List APP
          </Link>
        </div>
        <div>
          <Link to="/currency" className="navbar-link">
            Currency Converter APP
          </Link>
        </div>
      </div>
      <button className="theme-toggle" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

export default Navbar;
