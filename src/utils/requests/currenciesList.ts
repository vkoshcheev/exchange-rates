export enum InstrumentType {
  CurrencyIso = 'CurrencyIso',
  PreciousMetalIso = 'PreciousMetalIso',
}

export enum CurrencyIso {
  azn = 'azn', // Азербайджанский манат
  amd = 'amd', // Армянский драм
  byn = 'byn', // Белорусский рубль
  kzt = 'kzt', // Казахстанский Тенге
  kgs = 'kgs', // Киргизский сом
  mdl = 'mdl', // Молдавский лей
  rub = 'rub', // Российский рубль
  tjs = 'tjs', // Таджикский сомони
  tmm = 'tmm', // Туркменский манат
  uzs = 'uzs', // Узбекский сум
}

export enum PreciousMetalIso {
  xau = "xau", // Gold Ounce
  xag = "xag", // Silver Ounce
  xpt = "xpt", // Platinum Ounce
  xpd = "xpd", // Palladium Ounce
}

export type InstrumentIso = CurrencyIso | PreciousMetalIso;

const currencySymbols: { [key in CurrencyIso]: string } = {
  [CurrencyIso.azn]: '₼',
  [CurrencyIso.amd]: '֏',
  [CurrencyIso.byn]: 'Br',
  [CurrencyIso.kzt]: '₸',
  [CurrencyIso.kgs]: 'c̲',
  [CurrencyIso.mdl]: 'L',
  [CurrencyIso.rub]: '₽',
  [CurrencyIso.tjs]: 'c',
  [CurrencyIso.tmm]: 'm',
  [CurrencyIso.uzs]: 'so’m',
}

type InstrumentsData = {
  [key in InstrumentIso]: {
    iso: InstrumentIso;
    type: InstrumentType;
    symbol: string;
    name: string;
    countryShort?: string;
    country?: string;
    currencySymbol?: string;
  };
};

export const cisCurrenciesData = {
  [CurrencyIso.azn]: { iso: CurrencyIso.azn, type: InstrumentType.CurrencyIso, symbol: '🇦🇿', name: 'Азербайджанский манат', countryShort: 'Азербайджан',  country: 'Азербайджанская Республика', currencySymbol: '₼' },
  [CurrencyIso.amd]: { iso: CurrencyIso.amd, type: InstrumentType.CurrencyIso, symbol: '🇦🇲', name: 'Армянский драм',        countryShort: 'Армения',      country: 'Республика Армения', currencySymbol: '֏' },
  [CurrencyIso.byn]: { iso: CurrencyIso.byn, type: InstrumentType.CurrencyIso, symbol: '🇧🇾', name: 'Белорусский рубль',     countryShort: 'Белоруссия',   country: 'Белорусская Республика', currencySymbol: 'Br' },
  [CurrencyIso.kzt]: { iso: CurrencyIso.kzt, type: InstrumentType.CurrencyIso, symbol: '🇰🇿', name: 'Казахстанский тенге',   countryShort: 'Казахстан',    country: 'Республика Казахстан', currencySymbol: '₸' },
  [CurrencyIso.kgs]: { iso: CurrencyIso.kgs, type: InstrumentType.CurrencyIso, symbol: '🇰🇬', name: 'Киргизский сом',        countryShort: 'Киргизия',     country: 'Киргизская Республика', currencySymbol: 'c̲' },
  [CurrencyIso.mdl]: { iso: CurrencyIso.mdl, type: InstrumentType.CurrencyIso, symbol: '🇲🇩', name: 'Молдавский лей',        countryShort: 'Молдова',      country: 'Республика Молдова', currencySymbol: 'L' },
  [CurrencyIso.rub]: { iso: CurrencyIso.rub, type: InstrumentType.CurrencyIso, symbol: '🇷🇺', name: 'Российский рубль',      countryShort: 'Россия',       country: 'Российская Федерация', currencySymbol: '₽' },
  [CurrencyIso.tjs]: { iso: CurrencyIso.tjs, type: InstrumentType.CurrencyIso, symbol: '🇹🇯', name: 'Таджикский сомони',     countryShort: 'Таджикистан',  country: 'Республика Таджикистан', currencySymbol: 'c' },
  [CurrencyIso.tmm]: { iso: CurrencyIso.tmm, type: InstrumentType.CurrencyIso, symbol: '🇹🇲', name: 'Туркменский манат',     countryShort: 'Туркменистан', country: 'Туркменистан', currencySymbol: 'm' }, // alt = tmt
  [CurrencyIso.uzs]: { iso: CurrencyIso.uzs, type: InstrumentType.CurrencyIso, symbol: '🇺🇿', name: 'Узбекский сум',         countryShort: 'Узбекистан',   country: 'Республика Узбекистан', currencySymbol: 'so’m' },
}

export const cisCurrenciesDataArray = Object.values(cisCurrenciesData);

const preciousMetals = {
  [PreciousMetalIso.xau]: { iso: PreciousMetalIso.xau, type: InstrumentType.PreciousMetalIso, symbol: '✨', name: 'Золото' },
  [PreciousMetalIso.xag]: { iso: PreciousMetalIso.xag, type: InstrumentType.PreciousMetalIso, symbol: '✨', name: 'Серебро' },
  [PreciousMetalIso.xpt]: { iso: PreciousMetalIso.xpt, type: InstrumentType.PreciousMetalIso, symbol: '✨', name: 'Платина' },
  [PreciousMetalIso.xpd]: { iso: PreciousMetalIso.xpd, type: InstrumentType.PreciousMetalIso, symbol: '✨', name: 'Палладий' },
}

export const instrumentsData: InstrumentsData = {
  ...cisCurrenciesData,
  ...preciousMetals,
};

export const currencyKeysList = Object.values(CurrencyIso);
export const preciousMetalsKeysList = Object.values(PreciousMetalIso);
export const instrumentKeysList = [...currencyKeysList, ...preciousMetalsKeysList];

export type OrderedInstrumentIsoArray = {
  id: number;
  iso: InstrumentIso;
}[];

const getCurrencyIsoArrayWithIds = (isoArray: InstrumentIso[]): OrderedInstrumentIsoArray => {
  return isoArray.map((iso, index) => ({ id: index, iso }));
};

export const defaultCurrencyKeysListWithIds = getCurrencyIsoArrayWithIds(currencyKeysList);
export const defaultMetalKeysListWithIds = getCurrencyIsoArrayWithIds(preciousMetalsKeysList);