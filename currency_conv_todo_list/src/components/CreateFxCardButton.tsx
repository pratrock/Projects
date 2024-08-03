import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateFxCardButton.css";

interface CreateFxCardButtonProps {
  onAddPair: (baseCurrency: string, targetCurrency: string) => void;
}

const CreateFxCardButton: React.FC<CreateFxCardButtonProps> = ({
  onAddPair,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [baseCurrency, setBaseCurrency] = useState<string>("");
  const [targetCurrency, setTargetCurrency] = useState<string>("");
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchCurrencyOptions = async () => {
      try {
        const result = await axios.get("https://open.er-api.com/v6/latest");
        const currencies = Object.keys(result.data.rates);
        setCurrencyOptions(currencies);
      } catch (error) {
        console.error("Error fetching currency options:", error);
      }
    };

    fetchCurrencyOptions();
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setBaseCurrency("");
    setTargetCurrency("");
  };

  const handleAddPair = () => {
    if (baseCurrency && targetCurrency) {
      onAddPair(baseCurrency, targetCurrency);
      setIsOpen(false);
      setBaseCurrency("");
      setTargetCurrency("");
    }
  };

  return (
    <div className="create-button">
      <button className="button-symbol" onClick={handleOpenModal}>
        +
      </button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
            >
              <option value="">Select Base Currency</option>
              {currencyOptions.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
            >
              <option value="">Select Target Currency</option>
              {currencyOptions.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <button onClick={handleAddPair}>OK</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateFxCardButton;
