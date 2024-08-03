import React, { useState } from "react";
import FxPairCard from "./FxPairCard";
import CreateFxCardButton from "./CreateFxCardButton";
import { useTheme } from "../context/ThemeContext";
import "./CurrencyConverterPage.css";
const CurrencyConverterPage: React.FC = () => {
  const { fetchExchangeRate } = useTheme();
  const [pairs, setPairs] = useState<
    { baseCurrency: string; targetCurrency: string }[]
  >(() => {
    const storedPairs = localStorage.getItem("pairs");
    return storedPairs ? JSON.parse(storedPairs) : [];
  });

  const addPair = (baseCurrency: string, targetCurrency: string) => {
    const newPair = { baseCurrency, targetCurrency };
    setPairs([...pairs, newPair]);
    fetchExchangeRate(baseCurrency, targetCurrency);
    localStorage.setItem("pairs", JSON.stringify([...pairs, newPair]));
  };

  const removePair = (index: number) => {
    const updatedPairs = [...pairs];
    updatedPairs.splice(index, 1);
    setPairs(updatedPairs);
    localStorage.setItem("pairs", JSON.stringify(updatedPairs));
  };

  const handleInvertPair = (index: number) => {
    const updatedPairs = [...pairs];
    const pairToInvert = updatedPairs[index];
    const invertedPair = {
      baseCurrency: pairToInvert.targetCurrency,
      targetCurrency: pairToInvert.baseCurrency,
    };
    updatedPairs[index] = invertedPair;
    setPairs(updatedPairs);
    localStorage.setItem("pairs", JSON.stringify(updatedPairs));
    fetchExchangeRate(invertedPair.baseCurrency, invertedPair.targetCurrency);
  };

  return (
    <div className="currency-main">
      <h1>Currency Converter</h1>
      <div className="currency-container">
        {pairs.map((pair, index) => (
          <FxPairCard
            key={`${pair.baseCurrency}_${pair.targetCurrency}`}
            baseCurrency={pair.baseCurrency}
            targetCurrency={pair.targetCurrency}
            onRemove={() => removePair(index)}
            onInvertPair={() => handleInvertPair(index)}
          />
        ))}
      </div>
      <CreateFxCardButton onAddPair={addPair} />
    </div>
  );
};

export default CurrencyConverterPage;
