import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Home.css";
const Home: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className="home-container">
      <h1
        style={{
          color: theme === "dark" ? "#ffffff" : "#333333",
          textAlign: "center",
        }}
      >
        Practical Test
      </h1>
      <div className="link-container">
        <div>
          <Link to="/todo" className="link">
            Todo List APP
          </Link>
        </div>
        <div>
          <Link to="/currency" className="link">
            Currency converter APP
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
