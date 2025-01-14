import { InstrumentIso } from '../../../utils/requests/currenciesList';
import { Period, PeriodicCurrencyRatesData } from '../fetchAndBuildCurrencyExchangeRatesData';
import { getPercentageDifferenceForPeriod } from '../getPercentageDifferenceForPeriod';

const InstrumentPercentageChangeComponent = ({
  className,
  periodicExchangeRatesData,
  instrumentIso,
  period,
  reverseExchangeRates,
}: {
  periodicExchangeRatesData: PeriodicCurrencyRatesData;
  className: string;
  instrumentIso: InstrumentIso;
  period: Period;
  reverseExchangeRates: boolean;
}) => {
  const difference = getPercentageDifferenceForPeriod(
    periodicExchangeRatesData,
    instrumentIso,
    period,
    reverseExchangeRates
  );

  const isPositive = (difference || 0) > 0;
  const isNegative = (difference || 0) < 0;
  const formatted = (difference === null) ? '-' : `${isPositive ? '+' : ''}${difference.toFixed(2)}%`;

  return (
    <div 
      className={className}
      style={{ color: isPositive ? 'green' : isNegative ? 'red' : undefined }}
    >
      {formatted}
    </div>
  );
};

export default InstrumentPercentageChangeComponent;
