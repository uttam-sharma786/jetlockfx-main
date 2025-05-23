import React, { useState, useEffect } from 'react';
import { ArrowRight, RotateCw } from 'lucide-react';
import { useFxRate, Currency } from '../../contexts/FxRateContext';
import { NumericFormat } from 'react-number-format';

type CurrencyConverterProps = {
  showLockButton?: boolean;
  onLockRate?: (fromCurrency: string, toCurrency: string, amount: number, rate: number) => void;
};

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ 
  showLockButton = false, 
  onLockRate 
}) => {
  const { currencies, currentRates, convertAmount, isLoading } = useFxRate();
  
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [amount, setAmount] = useState<number>(100);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  // Get the current exchange rate
  const getCurrentRate = (): number | null => {
    const rateObj = currentRates.find(
      r => r.fromCurrency === fromCurrency && r.toCurrency === toCurrency
    );
    return rateObj ? rateObj.rate : null;
  };

  // Swap currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Convert amount when inputs change
  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      const result = convertAmount(amount, fromCurrency, toCurrency);
      setConvertedAmount(result);
    }
  }, [amount, fromCurrency, toCurrency, currentRates]);

  // Get currency details
  const getFromCurrencyDetails = (): Currency | undefined => {
    return currencies.find(c => c.code === fromCurrency);
  };

  const getToCurrencyDetails = (): Currency | undefined => {
    return currencies.find(c => c.code === toCurrency);
  };

  const fromCurrencyDetails = getFromCurrencyDetails();
  const toCurrencyDetails = getToCurrencyDetails();
  const currentRate = getCurrentRate();

  // Handle locking the rate
  const handleLockRate = () => {
    if (onLockRate && amount && currentRate) {
      onLockRate(fromCurrency, toCurrency, amount, currentRate);
    }
  };

  return (
    <div className="card-glass p-6 relative w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Currency Converter</h2>
      
      <div className="space-y-6">
        {/* From Currency */}
        <div className="grid grid-cols-4 gap-4 items-center">
          <label htmlFor="fromCurrency" className="col-span-1 text-gray-600 font-medium">
            From
          </label>
          <div className="col-span-3 flex space-x-3">
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="input bg-gray-50"
              disabled={isLoading}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Amount */}
        <div className="grid grid-cols-4 gap-4 items-center">
          <label htmlFor="amount" className="col-span-1 text-gray-600 font-medium">
            Amount
          </label>
          <div className="col-span-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">
                  {fromCurrencyDetails?.symbol}
                </span>
              </div>
              <NumericFormat
                id="amount"
                value={amount}
                onValueChange={(values) => setAmount(Number(values.value))}
                thousandSeparator={true}
                decimalScale={2}
                className="input pl-8"
                placeholder="Enter amount"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        
        {/* Swap button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwapCurrencies}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            disabled={isLoading}
            aria-label="Swap currencies"
          >
            <RotateCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* To Currency */}
        <div className="grid grid-cols-4 gap-4 items-center">
          <label htmlFor="toCurrency" className="col-span-1 text-gray-600 font-medium">
            To
          </label>
          <div className="col-span-3 flex space-x-3">
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="input bg-gray-50"
              disabled={isLoading}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Converted amount and rate */}
        <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Converted Amount</span>
            <div className="flex items-center text-gray-500 text-sm">
              <span>Updated just now</span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {convertedAmount !== null ? (
              <>
                {toCurrencyDetails?.symbol}{' '}
                {convertedAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </>
            ) : (
              <span className="text-gray-400">--</span>
            )}
          </div>
          
          <div className="text-sm text-gray-600">
            {currentRate ? (
              <div className="flex items-center space-x-1">
                <span>
                  1 {fromCurrency} <ArrowRight className="inline w-3 h-3" /> 
                  {currentRate.toFixed(4)} {toCurrency}
                </span>
              </div>
            ) : (
              <span className="text-gray-400">Rate unavailable</span>
            )}
          </div>
        </div>
        
        {/* Lock rate button */}
        {showLockButton && (
          <button
            onClick={handleLockRate}
            className="btn-accent w-full"
            disabled={isLoading || !currentRate}
          >
            Lock This Rate for 24 Hours
          </button>
        )}
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;