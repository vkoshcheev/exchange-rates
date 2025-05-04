import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import AppSelectorMenu from '../../components/AppSelectorMenu/AppSelectorMenu';
import AppSpinner from '../../components/AppSpinner/AppSpinner';
import AppSwitchButton from '../../components/AppSwitchButton/AppSwitchButton';
import { setDraggingRowsEnabled, setPeriodicExchangeRatesData } from '../../redux/mainReducer';
import { useAppSelector } from '../../redux/store';
import { addFlagsFormatting } from '../../utils/addFlagsFormatting';
import { useLocalStorage } from 'utils-library';
import localStorageKeys from '../../utils/localStorageKeys';
import {
  CurrencyIso,
  cisCurrenciesData,
  cisCurrenciesDataArray,
  instrumentKeysList
} from '../../utils/requests/currenciesList';
import { currencyApiRequest } from '../../utils/requests/currencyApiRequest';
import './RatesSection.scss';
import ExchangeRatesTable from './components/ExchangeRatesTable';
import { Period, datePeriodStrings, structureExchangeData } from './fetchAndBuildCurrencyExchangeRatesData';
import { getExampleText } from './getExampleText';

const RatesSection = () => {
  const dispatch = useDispatch();
  const draggingRowsEnabled = useAppSelector(store => store.main.draggingRowsEnabled);
  const periodicExchangeRatesData = useAppSelector(store => store.main.periodicExchangeRatesData);
  const currenciesOrderedList = useAppSelector(state => state.main.currenciesOrderedList);

  const toggleDraggingsRows = () => {
    dispatch(setDraggingRowsEnabled(!draggingRowsEnabled));
  }

  const [usingIsoNames, setUsingIsoNames] = useLocalStorage(localStorageKeys.useIsoCodesForNames, false);
  const [measurePreciousMetalsInGrams, setMeasurePreciousMetalsInGrams] = useLocalStorage(
    localStorageKeys.useGramsForMetals,
    true
  );

  const [baseCurrencyIso, setBaseCurrencyIso] = useState<CurrencyIso>(CurrencyIso.rub);
  const currencyMenuItems = cisCurrenciesDataArray.map((currencyData, index) => ({
    label: `${currencyData.symbol} ${currencyData.name} (${currencyData.currencySymbol})`,
    id: currencyData.iso,
  }));

  const ratesLatestQuery = useQuery({
    queryKey: ['rates', baseCurrencyIso],
    queryFn: () => currencyApiRequest(baseCurrencyIso),
    refetchInterval: 480000,
    enabled: true,
    retry: 3,
    retryDelay: 1000,
  });
  const ratesMonthAgoQuery = useQuery({
    queryKey: ['rates', baseCurrencyIso, datePeriodStrings.monthAgo],
    queryFn: () => currencyApiRequest(baseCurrencyIso, datePeriodStrings.monthAgo),
    refetchInterval: 2700000,
    enabled: ratesLatestQuery.isSuccess,
    retry: 1,
  });
  const ratesHalfYearAgoQuery = useQuery({
    queryKey: ['rates', baseCurrencyIso, datePeriodStrings.halfYearAgo],
    queryFn: () => currencyApiRequest(baseCurrencyIso, datePeriodStrings.halfYearAgo),
    refetchInterval: 16200000,
    enabled: ratesMonthAgoQuery.isSuccess,
    retry: 1,
  });

  useEffect(() => {
    const updated = {
      [Period.latest]: structureExchangeData(instrumentKeysList, ratesLatestQuery.data?.data),
      [Period.monthAgo]: structureExchangeData(instrumentKeysList, ratesMonthAgoQuery.data?.data),
      [Period.halfYearAgo]: structureExchangeData(instrumentKeysList, ratesHalfYearAgoQuery.data?.data),
    };
    dispatch(setPeriodicExchangeRatesData(updated));
  }, [
    instrumentKeysList,
    ratesLatestQuery.data,
    ratesMonthAgoQuery.data,
    ratesHalfYearAgoQuery.data,
  ]);

  // ################################################################################################
  // ################################################################################################
  const [reverseExchangeRates, setReverseExchangeRates] = useLocalStorage(
    localStorageKeys.useReverseExchangeRate,
    false
  );

  const {
    name: baseCurrencyName,
    symbol: baseCurrencyFlag,
  } = cisCurrenciesData[baseCurrencyIso];

  const baseCurrencyText = `${baseCurrencyFlag} ${baseCurrencyName}`;

  const baseTargetModeStrings = ['Валюта', ' / ', baseCurrencyText];
  const baseTargetModeText = (
    reverseExchangeRates ? baseTargetModeStrings.reverse() : baseTargetModeStrings
  ).join('');

  const exampleText = useMemo(() => {
    const filteredCurrencyKeysList = currenciesOrderedList
      .map((item) => item.iso)
      .filter((key) => key !== baseCurrencyIso);

    return addFlagsFormatting(
      getExampleText({
        filteredCurrencyKeysList,
        baseCurrencyText,
        reverseExchangeRates,
        periodicExchangeRatesData,
      })
    );
  }, [currenciesOrderedList, periodicExchangeRatesData, baseCurrencyText, reverseExchangeRates]);

  // ################################################################################################
  // ################################################################################################

  return (
    <div className="section rates-section">
      <div className="rates-section__top">
        <div className="rates-section__top__menus">
          <AppSelectorMenu
            menuItems={currencyMenuItems}
            selectedItemId={baseCurrencyIso}
            onSelect={(iso) => setBaseCurrencyIso(iso as CurrencyIso)}
            className="rates-section__top__menus__item"
            modalClassName="rates-section__top__menus__modal"
            styles={{ padding: 0, margin: 0 }}
          />

          <button
            className="rates-section__top__menus__item rates-section__top__menus__base-target-switch"
            onClick={() => setReverseExchangeRates((prev) => !prev)}
          >
            {addFlagsFormatting(baseTargetModeText)}
          </button>
        </div>

        <div className="rates-section__top__details">
          <div className="rates-section__top__details__item rates-section__top__details__item__example">
            <div className="rates-section__top__details__item__example__title">Пример:</div>
            {exampleText ? <div>{exampleText}</div> : <AppSpinner size={24} thickness={4} />}
          </div>

          <div className="rates-section__top__details__item">
            <div>
              <b>Единица измерения драгоценных металлов:</b>
            </div>
            <AppSwitchButton
              optionOneText={'Грамм'}
              optionTwoText={'Тройская унция'}
              firstOptionIsSelected={measurePreciousMetalsInGrams}
              setFirstOptionIsSelected={setMeasurePreciousMetalsInGrams}
              styles={{ flex: 1 }}
            />
          </div>

          <button
            className="rates-section__top__details__item rates-section__iso-names-switch"
            onClick={() => setUsingIsoNames((prev) => !prev)}
          >
            <div className="rates-section__iso-names-switch__checkbox">{usingIsoNames ? '✔' : ''}</div>
            <div>Использовать ISO коды для названий валют</div>
          </button>

          <button
            className="rates-section__top__details__item rates-section__iso-names-switch"
            onClick={toggleDraggingsRows}
          >
            <div className="rates-section__iso-names-switch__checkbox">{draggingRowsEnabled ? '✔' : ''}</div>
            <div>Включить возможность изменения порядка инструментов</div>
          </button>
        </div>
      </div>

      <ExchangeRatesTable
        baseCurrencyIso={baseCurrencyIso}
        reverseExchangeRates={reverseExchangeRates}
        usingIsoNames={usingIsoNames}
        measurePreciousMetalsInGrams={measurePreciousMetalsInGrams}
      />
    </div>
  );
};

export default RatesSection;
