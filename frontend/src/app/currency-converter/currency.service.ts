import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FxRateResponseData, FxRateCurrenciesResponseData } from './fxrates.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private httpClient: HttpClient) {}

  /* To get the current currency exchange rates based on the base provided for the given 'toCurrency' */
  getExchangeRates(): Observable<FxRateResponseData> {
    return this.httpClient.get<FxRateResponseData>(
      'http://localhost:5500/public/exchange-rates'
    );
  }

  getCurrencies(): Observable<FxRateCurrenciesResponseData> {
    return this.httpClient.get<FxRateCurrenciesResponseData>(
      'http://localhost:5500/public/exchange-rates/currencies'
    );
  }

  getExchangeRatesByCurrency(event: Event): Observable<FxRateResponseData> {
    const currency = (event.target as HTMLInputElement).value;
    
    return this.httpClient
      .get<FxRateResponseData>(
        `http://localhost:5500/public/exchange-rates/${currency}`
      );
  }
}
