import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  exchangeRates: Record<string, number>;
  lastUpdated: Record<string, string>;
  fetchExchangeRate: (baseCurrency: string, targetCurrency: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  exchangeRates: {},
  lastUpdated: {},
  fetchExchangeRate: () => {},
});

export const useTheme = () => {
  return useContext(ThemeContext);
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "light";
  });

  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    () => {
      const storedRates = localStorage.getItem("exchangeRates");
      return storedRates ? JSON.parse(storedRates) : {};
    }
  );

  const [lastUpdated, setLastUpdated] = useState<Record<string, string>>(() => {
    const storedLastUpdated = localStorage.getItem("lastUpdated");
    return storedLastUpdated ? JSON.parse(storedLastUpdated) : {};
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const fetchExchangeRate = async (
    baseCurrency: string,
    targetCurrency: string
  ): Promise<number> => {
    try {
      const result = await axios(
        `https://open.er-api.com/v6/latest/${baseCurrency}`
      );
      const rates = result.data.rates;
      const exchangeRate = rates[targetCurrency];

      setExchangeRates((prevRates) => ({
        ...prevRates,
        [`${baseCurrency}_${targetCurrency}`]: exchangeRate,
      }));
      setLastUpdated((prevUpdated) => ({
        ...prevUpdated,
        [`${baseCurrency}_${targetCurrency}`]: result.data.time_last_update_utc,
      }));

      localStorage.setItem("exchangeRates", JSON.stringify(exchangeRates));
      localStorage.setItem("lastUpdated", JSON.stringify(lastUpdated));

      return exchangeRate;
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      throw error;
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        exchangeRates,
        lastUpdated,
        fetchExchangeRate,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
