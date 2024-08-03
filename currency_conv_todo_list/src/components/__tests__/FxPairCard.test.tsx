/* import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../../context/ThemeContext";
import FxPairCard from "../FxPairCard";

describe("FxPairCard", () => {
  const renderFxPairCard = (props) =>
    render(
      <ThemeProvider>
        <FxPairCard {...props} />
      </ThemeProvider>
    );

  it("renders base and target currencies", () => {
    const { getByText } = renderFxPairCard({
      baseCurrency: "USD",
      targetCurrency: "EUR",
      onRemove: () => {},
      onInvertPair: () => {},
    });

    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    const handleRemove = jest.fn();
    const { getByTestId } = renderFxPairCard({
      baseCurrency: "USD",
      targetCurrency: "EUR",
      onRemove: handleRemove,
      onInvertPair: () => {},
    });

    fireEvent.click(screen.getByTestId("remove-button"));
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it("calls onInvertPair when invert button is clicked", () => {
    const handleInvertPair = jest.fn();
    const { getByTestId } = renderFxPairCard({
      baseCurrency: "USD",
      targetCurrency: "EUR",
      onRemove: () => {},
      onInvertPair: handleInvertPair,
    });

    fireEvent.click(screen.getByTestId("invert-button"));
    expect(handleInvertPair).toHaveBeenCalledTimes(1);
  });

  it("displays the correct exchange rate", () => {
    const exchangeRate = 0.85;
    const { getByText } = renderFxPairCard({
      baseCurrency: "USD",
      targetCurrency: "EUR",
      onRemove: () => {},
      onInvertPair: () => {},
      exchangeRate,
    });

    expect(screen.getByText(exchangeRate.toString())).toBeInTheDocument();
  });
});
 */

import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import FxPairCard from "../FxPairCard";
import { useTheme } from "../../context/ThemeContext";

jest.mock("../../context/ThemeContext");

describe("FxPairCard", () => {
  const mockFetchExchangeRate = jest.fn();

  beforeEach(() => {
    useTheme.mockReturnValue({
      fetchExchangeRate: mockFetchExchangeRate,
      exchangeRates: { USD_EUR: 0.92 },
      lastUpdated: {},
    });
  });

  it("displays the correct exchange rate", async () => {
    render(
      <FxPairCard
        baseCurrency="USD"
        targetCurrency="EUR"
        onRemove={() => {}}
        onInvertPair={() => {}}
      />
    );

    await waitFor(() => {
      expect(mockFetchExchangeRate).toHaveBeenCalledWith("USD", "EUR");
      /*  expect(screen.getByText("0.92")).toBeInTheDocument(); */
    });
    await waitFor(() => {
      expect(screen.getByText("0.92")).toBeInTheDocument();
    });
  });

  it("renders base and target currencies", () => {
    render(
      <FxPairCard
        baseCurrency="USD"
        targetCurrency="EUR"
        onRemove={() => {}}
        onInvertPair={() => {}}
        exchangeRate={0.92}
      />
    );

    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    const handleRemove = jest.fn();

    render(
      <FxPairCard
        baseCurrency="USD"
        targetCurrency="EUR"
        onRemove={handleRemove}
        onInvertPair={() => {}}
        exchangeRate={0.92}
      />
    );

    fireEvent.click(screen.getByTestId("remove-button"));
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it("calls onInvertPair when invert button is clicked", () => {
    const handleInvertPair = jest.fn();

    render(
      <FxPairCard
        baseCurrency="USD"
        targetCurrency="EUR"
        onRemove={() => {}}
        onInvertPair={handleInvertPair}
        exchangeRate={0.92}
      />
    );

    fireEvent.click(screen.getByTestId("invert-button"));
    expect(handleInvertPair).toHaveBeenCalledTimes(1);
  });
});
