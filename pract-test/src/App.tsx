import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoListPage from "./components/TodoListPage";
import CurrencyConverterPage from "./components/CurrencyConverterPage";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import { useTheme } from "./context/ThemeContext";
const App: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <ThemeProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<TodoListPage />} />
            <Route path="/currency" element={<CurrencyConverterPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
