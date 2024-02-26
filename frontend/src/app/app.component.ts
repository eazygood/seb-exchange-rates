import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  NO_ERRORS_SCHEMA,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface FxRateData {
  [currency: string]: FxRate[];
}

interface FxRate {
  date: string;
  source_rate: string;
  target_rate: string;
}
interface FxRateResponseData {
  data: FxRateData;
  currencies: [];
}

interface FxRateCurrenciesResponseData {
  data: string[];
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'seb exchange rates';
  fxRates: FxRateData;
  rates: FxRateData;
  currencies: string[] = [];
  fromCurrency: string = '';
  toCurrency: string = '';
  amount: number | null = 1;
  convertResult: string = '';
  convertExchangeRate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getFxRatesCurrencies();
  }

  getFxRatesCurrencies() {
    this.http
      .get<FxRateResponseData>('http://localhost:5500/public/exchange-rates')
      .subscribe((response) => {
        this.fxRates = response.data;
      });

    this.http
      .get<FxRateCurrenciesResponseData>(
        'http://localhost:5500/public/exchange-rates/currencies'
      )
      .subscribe((response) => {
        this.currencies = response.data;
        console.log(this.currencies);
      });
  }

  getFxRatesByCurrency(event: Event) {
    console.log("TJTJT")
    const currency = (event.target as HTMLInputElement).value;
    this.http
      .get<FxRateResponseData>(
        `http://localhost:5500/public/exchange-rates/${currency}`
      )
      .subscribe((response) => {
        this.rates = response.data;
        console.log(this.rates);
      });
  }

  convertCurrency(): void {
    console.log('sdf', this.amount, this.fromCurrency, this.toCurrency)
    if (!this.amount || this.fromCurrency === '' || this.toCurrency === '') {
      return;
    }

    const fromCurrencyFxRate = this.fromCurrency === 'EUR' ? '1' : this.fxRates[this.fromCurrency][0].target_rate;
    const toCurrencyFxRate = this.toCurrency === 'EUR' ? '1' : this.fxRates[this.toCurrency][0].target_rate

    // source rate to 1 EUR
    const sourceCurrencyRateToEUR = 1 / parseFloat(fromCurrencyFxRate);
    const targetCurrencyRateToEUR = parseFloat(toCurrencyFxRate);
    const exchangeRate =  sourceCurrencyRateToEUR * targetCurrencyRateToEUR;

    const amountInEUR: number = this.amount * exchangeRate;

    this.convertExchangeRate = exchangeRate.toFixed(2);
    this.convertResult = amountInEUR.toFixed(2);
  }

  swapCurrencies():void {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;

    this.convertCurrency();
  }

}
