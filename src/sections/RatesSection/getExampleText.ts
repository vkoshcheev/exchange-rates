import { CurrencyIso, InstrumentIso, cisCurrenciesData } from "../../utils/requests/currenciesList";
import { PeriodicCurrencyRatesData, Period } from "./fetchAndBuildCurrencyExchangeRatesData";

export function getExampleText({
  filteredCurrencyKeysList,
  periodicExchangeRatesData,
  baseCurrencyText,
  reverseExchangeRates,
}: {
  filteredCurrencyKeysList: InstrumentIso[],
  periodicExchangeRatesData?: PeriodicCurrencyRatesData | null;
  baseCurrencyText: string;
  reverseExchangeRates: boolean;
}) {
  if (!periodicExchangeRatesData) return '';

  const latestExchangeData = periodicExchangeRatesData[Period.latest];
  if (!latestExchangeData) return '';

  const exampleCurrencyKey = filteredCurrencyKeysList[0] as CurrencyIso;
  const { name: exampleCurrencyName, symbol: exampleCurrencyFlag } = cisCurrenciesData[exampleCurrencyKey];

  const exampleCurrencyRates = latestExchangeData[exampleCurrencyKey];
  const exampleCurrencyText = (
    reverseExchangeRates ? exampleCurrencyRates.direct.toFixed(4).toString() : '1'
  )
    .concat(' ', exampleCurrencyFlag)
    .concat(' ', exampleCurrencyName);

  const baseCurrencyExampleValue = reverseExchangeRates ? 1 : exampleCurrencyRates.reverse.toFixed(4);
  const baseCurrencyExampleText = `${baseCurrencyExampleValue} ${baseCurrencyText}`;

  const exampleStrings = [exampleCurrencyText, ' = ', baseCurrencyExampleText];
  const exampleText = (reverseExchangeRates ? exampleStrings.reverse() : exampleStrings).join('');
  return exampleText;
};