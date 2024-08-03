import React, { useState, useEffect } from "react";
import CurrencyConverter from "./CurrencyConverter";
import { useTheme } from "../context/ThemeContext";
import "./FxPairCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUndo,
  faArrowsAltV,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
interface FxPairCardProps {
  baseCurrency: string;
  targetCurrency: string;
  onRemove: () => void;
  onInvertPair: () => void;
}

const FxPairCard: React.FC<FxPairCardProps> = ({
  baseCurrency,
  targetCurrency,
  onRemove,
  onInvertPair,
}) => {
  const { fetchExchangeRate, exchangeRates, lastUpdated } = useTheme();

  const [pairExchangeRate, setPairExchangeRate] = useState<number>(
    exchangeRates[`${baseCurrency}_${targetCurrency}`] || 0
  );
  const [pairLastUpdated, setPairLastUpdated] = useState<string>(
    lastUpdated[`${baseCurrency}_${targetCurrency}`] || ""
  );

  useEffect(() => {
    const fetchRate = async () => {
      await fetchExchangeRate(baseCurrency, targetCurrency);
      setPairExchangeRate(
        exchangeRates[`${baseCurrency}_${targetCurrency}`] || 0
      );
      setPairLastUpdated(
        lastUpdated[`${baseCurrency}_${targetCurrency}`] || ""
      );
    };

    fetchRate();
  }, [baseCurrency, targetCurrency, lastUpdated]);

  return (
    <div className="fx-card">
      <div className="fx-card-header-right">
        <span className="reload-button">
          <FontAwesomeIcon
            icon={faUndo}
            data-testid="invert-button"
            onClick={onInvertPair}
          />
        </span>
        <span
          className="remove-button"
          data-testid="remove-button"
          onClick={onRemove}
        >
          <FontAwesomeIcon icon={faXmark} />
        </span>
      </div>
      <div className="fx-card-header">
        <div className="fx-card-rates">
          <span className="base-currency">{baseCurrency}</span>
          <span>
            <FontAwesomeIcon icon={faArrowsAltV} />
          </span>

          <span className="target-currency">{targetCurrency}</span>
        </div>
        <div>
          <span className="exchange-rate" data-testid="exchange-rate">
            {pairExchangeRate.toFixed(2)}
          </span>
        </div>
        <CurrencyConverter
          baseCurrency={baseCurrency}
          targetCurrency={targetCurrency}
          exchangeRate={pairExchangeRate}
        />
      </div>
      <p className="last-updated">Last Updated:</p>
      <p className="last-updated"> {pairLastUpdated}</p>
    </div>
  );
};

export default FxPairCard;
