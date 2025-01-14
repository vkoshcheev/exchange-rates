import { InstrumentIso } from "../../utils/requests/currenciesList";
import { PeriodicCurrencyRatesData, Period } from "./fetchAndBuildCurrencyExchangeRatesData";

export function getPercentageDifferenceForPeriod(
  currencyExchangeRateData: PeriodicCurrencyRatesData,
  instrumentIso: InstrumentIso,
  period: Period,
  direct: boolean,
) {
  
  const direction = direct ? 'direct' : 'reverse';
  const latestRate = currencyExchangeRateData[Period.latest]?.[instrumentIso][direction];
  const periodRate = currencyExchangeRateData[period]?.[instrumentIso][direction];
  if (!periodRate || !latestRate) return null;

  const difference = ((latestRate - periodRate) / periodRate) * 100;
  return difference;
}