import React, { useState, useEffect } from "react";

interface CurrencyConverterProps {
  baseCurrency: string;
  targetCurrency: string;
  exchangeRate: number;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  exchangeRate,
}) => {
  const [baseAmount, setBaseAmount] = useState<string>("1");
  const [targetAmount, setTargetAmount] = useState<string>(
    (parseFloat("1") * exchangeRate).toFixed(2)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTargetAmount = calculateTargetAmount(baseAmount, exchangeRate);
      setTargetAmount(newTargetAmount);
    }, 500);

    return () => clearTimeout(timer);
  }, [baseAmount, exchangeRate]);

  const calculateTargetAmount = (base: string, rate: number): string => {
    const parsedBase = parseFloat(base);
    if (isNaN(parsedBase)) return "";
    return (parsedBase * rate).toFixed(2);
  };

  const handleBaseAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setBaseAmount(String(value));
      const newTargetAmount = calculateTargetAmount(value, exchangeRate);
      setTargetAmount(newTargetAmount);
    }
  };

  const handleTargetAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setTargetAmount(String(value));
      const newBaseAmount = parseFloat(value) / exchangeRate;
      setBaseAmount(isNaN(newBaseAmount) ? "" : newBaseAmount.toFixed(2));
    }
  };

  return (
    <div className="converter">
      <div>
        <label htmlFor="base-amount">Base Amount:</label>
        <input
          id="base-amount"
          type="text"
          value={baseAmount}
          onChange={handleBaseAmountChange}
        />
      </div>
      <div>
        <label htmlFor="target-amount">Target Amount:</label>
        <input
          id="target-amount"
          type="text"
          value={targetAmount}
          onChange={handleTargetAmountChange}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
