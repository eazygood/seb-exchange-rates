export interface FxRateData {
  [currency: string]: FxRate[];
}

export interface FxRate {
  date: string;
  source_rate: string;
  target_rate: string;
}
export interface FxRateResponseData {
  data: FxRateData;
  currencies: [];
}

export interface FxRateCurrenciesResponseData {
  data: string[];
}
