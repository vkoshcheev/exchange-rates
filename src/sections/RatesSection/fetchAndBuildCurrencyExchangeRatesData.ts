import { InstrumentIso } from "../../utils/requests/currenciesList";

export const datePeriodStrings = getDatePeriodStrings();

export enum Period {
  latest = 'latest',
  // yesterday = 'yesterday',
  // weekAgo = 'weekAgo',
  monthAgo = 'monthAgo',
  halfYearAgo = 'halfYearAgo',
}

export const periods = Object.values(Period);

export type PeriodicCurrencyRatesData = {
  [key in Period]: ProcessedCurrencyRatesData | null;
}

export type ProcessedCurrencyRatesData = { [key in InstrumentIso]: { direct: number; reverse: number } };

export function structureExchangeData (
  instrumentKeysList: string[],
  exchangeRatesRaw?: Record<string, number>,
) {
  if (!exchangeRatesRaw) return null;

  const structuredExchangeData = instrumentKeysList.reduce((acc, instrumentKey) => {
    // rebuild after filtering
    const rateDirect = exchangeRatesRaw[instrumentKey];
    const rateReverse = 1 / rateDirect;
    return { ...acc, [instrumentKey as InstrumentIso]: { direct: rateDirect, reverse: rateReverse } };
  }, {} as ProcessedCurrencyRatesData);

  return structuredExchangeData;
};

function getDatePeriodStrings () {
  function formatDate (dateMs: number): string {
    const date = new Date(dateMs);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const today = new Date();

  return {
    yesterday:   formatDate(new Date().setDate(today.getDate() - 1)),
    weekAgo:     formatDate(new Date().setDate(today.getDate() - 7)),
    monthAgo:    formatDate(new Date().setMonth(today.getMonth() - 1)),
    halfYearAgo: formatDate(new Date().setMonth(today.getMonth() - 6)),
    yearAgo:     formatDate(new Date().setFullYear(today.getFullYear() - 1)),
    twoYearsAgo: formatDate(new Date().setFullYear(today.getFullYear() - 2)),
  };
}