import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

const DEFAULT = 'USD';

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrencyState] = useState(() => {
    try {
      const stored = localStorage.getItem('currency');
      return stored || DEFAULT;
    } catch (e) {
      return DEFAULT;
    }
  });

  const exchangeRates = {
    USD: 1,
    EGP: 49.5,
    SAR: 3.75,
    AED: 3.67,
  };

  useEffect(() => {
    try {
      localStorage.setItem('currency', currency);
    } catch (e) {
      // ignore
    }
  }, [currency]);

  const setCurrency = (c) => {
    if (!exchangeRates[c]) return;
    setCurrencyState(c);
  };

  const formatPrice = (priceInUSD, options = {}) => {
    const rate = exchangeRates[currency] || 1;
    const converted = Number(priceInUSD) * rate;
    
    // Custom currency symbols without $
    const currencySymbols = {
      USD: '$',
      EGP: 'ج.م',  // Egyptian Pound
      SAR: 'ر.س',  // Saudi Riyal
      AED: 'د.إ',  // UAE Dirham
    };
    
    const symbol = currencySymbols[currency] || currency;
    const formattedNumber = converted.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    return `${formattedNumber} ${symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, exchangeRates }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
