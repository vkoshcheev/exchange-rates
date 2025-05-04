import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { isNumber } from 'lodash';
import React from 'react';
import { addModifierToClassWhenConditionIsTrue } from 'utils-library';
import AppSpinner from '../../../components/AppSpinner/AppSpinner';
import { useAppSelector } from '../../../redux/store';
import { CurrencyIso, InstrumentIso, cisCurrenciesData, instrumentsData } from '../../../utils/requests/currenciesList';
import { Period, PeriodicCurrencyRatesData, periods } from '../fetchAndBuildCurrencyExchangeRatesData';
import './ExchangeRatesTableRow.scss';
import InstrumentPercentageChangeComponent from './InstrumentPercentageChangeComponent';

const ExchangeRatesTableRow = ({
  id,
  iso,
  baseCurrencyIso,
  periodicExchangeRatesData,
  reverseExchangeRates,
  precision,
  usingIsoNames,
  isFirst = false,
}: {
  iso: InstrumentIso;
  id: number;
  baseCurrencyIso: CurrencyIso;
  periodicExchangeRatesData: PeriodicCurrencyRatesData;
  reverseExchangeRates: boolean;
  precision: number;
  usingIsoNames: boolean;
  isFirst?: boolean;
}) => {
  const draggingRowsEnabled = useAppSelector(store => store.main.draggingRowsEnabled);
  const { setNodeRef: setDroppableRef } = useDroppable({ id });
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });
  const draggableStyle: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    cursor: draggingRowsEnabled ? 'grab' : undefined,
    touchAction: draggingRowsEnabled ? 'none' : undefined,
  };
  // ########################################################################################
  // ########################################################################################

  const {
    symbol: baseCurrencyFlag,
    currencySymbol: baseCurrencySymbol,
  } = cisCurrenciesData[baseCurrencyIso];

  const instrumentData = instrumentsData[iso];
  
  const { currencySymbol: currentCurrencySymbol = '' } = { ...instrumentData };
  const currencySymbol = reverseExchangeRates ? currentCurrencySymbol : baseCurrencySymbol;
  
  const formulaDirection = reverseExchangeRates ? 'direct' : 'reverse';
  let rates = Object.fromEntries(
    Object.values(Period).map((period) => {
      const value = periodicExchangeRatesData[period]?.[iso][formulaDirection];
      return [period, isNumber(value) ? value : null];
    })
  ) as { [key in Period]: number };

  return (
    <>
      {!isFirst && (
        <tr>
          <td className="instrument-row__data-separator" colSpan={3} />
          <td className="instrument-row__data-separator hide-below-720" colSpan={2} />
        </tr>
      )}

      <tr
        ref={(node) => {
          setNodeRef(node);
          setDroppableRef(node); // row is both draggable and droppable
        }}
        {...attributes}
        {...listeners}
        className={addModifierToClassWhenConditionIsTrue('instrument-row', isFirst, '--first')}
        style={{ borderTopStyle: isFirst ? 'solid' : undefined, ...draggableStyle }}
      >
        <td>
          <div
            className={addModifierToClassWhenConditionIsTrue(
              'instrument-row__instrument-name',
              !reverseExchangeRates,
              '--reverse'
            )}
          >
            {!usingIsoNames ? (
              <span className="instrument-row__instrument-name__text">
                <span className="instrument-row__instrument-name__text__symbol">
                  {instrumentData.symbol}
                </span>
                <span className="linebreak-after-every-word">{instrumentData.name}</span>
              </span>
            ) : (
              <>
                <span className="instrument-row__instrument-name__text">
                  <span className="instrument-row__instrument-name__text__symbol">{baseCurrencyFlag}</span>
                  <span style={{ fontFamily: 'monospace' }}>{baseCurrencyIso.toUpperCase()}</span>
                </span>
                &nbsp;/&nbsp;
                <span className="instrument-row__instrument-name__text">
                  <span className="instrument-row__instrument-name__text__symbol">
                    {instrumentData.symbol}
                  </span>
                  <span style={{ fontFamily: 'monospace' }}>{instrumentData.iso.toUpperCase()}</span>
                </span>
              </>
            )}
          </div>
        </td>

        {periods.map((period) => {
          const isLatest = period === Period.latest;

          if (rates[period] === null)
            return (
              <td className="instrument-row__instrument-spinner" colSpan={isLatest ? 2 : 1} key={period}>
                <AppSpinner
                  styles={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: isLatest ? 'center' : 'flex-end',
                  }}
                />
              </td>
            );

          if (isLatest)
            return (
              <React.Fragment key={period}>
                <td className="instrument-row__instrument-rate">{rates[period].toFixed(precision)}</td>
                <td className="instrument-row__instrument-rate__currency-symbol">{currencySymbol}</td>
              </React.Fragment>
            );

          return (
            <td className="hide-below-720" key={period}>
              <div className="instrument-row__instrument-rate">{rates[period].toFixed(precision)}</div>
              <InstrumentPercentageChangeComponent
                className="instrument-row__instrument-rate"
                periodicExchangeRatesData={periodicExchangeRatesData}
                instrumentIso={iso}
                period={period}
                reverseExchangeRates={reverseExchangeRates}
              />
            </td>
          );
        })}
      </tr>
    </>
  );
};

export default ExchangeRatesTableRow;