import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { PeriodicCurrencyRatesData } from '../sections/RatesSection/fetchAndBuildCurrencyExchangeRatesData';
import { OrderedInstrumentIsoArray, defaultCurrencyKeysListWithIds } from '../utils/requests/currenciesList';
import localStorageKeys from '../utils/localStorageKeys';

interface MainState {
  draggingRowsEnabled: boolean;
  periodicExchangeRatesData: PeriodicCurrencyRatesData;
  currenciesOrderedList: OrderedInstrumentIsoArray;
};

const storedCurrencyKeysListWithIds = localStorage.getItem(localStorageKeys.currenciesOrder);
const currencyKeysListWithIds = storedCurrencyKeysListWithIds
  ? JSON.parse(storedCurrencyKeysListWithIds)
  : defaultCurrencyKeysListWithIds;

const initialState: MainState = {
  periodicExchangeRatesData: {
    latest: null,
    monthAgo: null,
    halfYearAgo: null,
  },
  draggingRowsEnabled: false,
  currenciesOrderedList: currencyKeysListWithIds,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // ####################################################################################
    setDraggingRowsEnabled: (state, { payload }: PayloadAction<boolean>) => {
      state.draggingRowsEnabled = payload;
    },
    setPeriodicExchangeRatesData: (state, { payload }: PayloadAction<PeriodicCurrencyRatesData>) => {
      state.periodicExchangeRatesData = payload;
    },
    setCurrenciesOrderedList: (state, { payload }: PayloadAction<OrderedInstrumentIsoArray>) => {
      state.currenciesOrderedList = payload;
    },
    // ####################################################################################
  },
});

export const {
  setDraggingRowsEnabled,
  setPeriodicExchangeRatesData,
  setCurrenciesOrderedList,
} = mainSlice.actions;

export default mainSlice.reducer;
