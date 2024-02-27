import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import { FxRateData } from './fxrates.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css',],
  imports: [RouterOutlet, HttpClientModule, CommonModule, FormsModule],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})

export class CurrencyConverterComponent implements OnInit {
  title = 'seb exchange rates';
  fxRates: FxRateData;
  rates: FxRateData;
  currencies: string[] = [];
  fromCurrency: string = '';
  toCurrency: string = '';
  amount: number | null = 1;
  convertResult: string = '';
  convertExchangeRate: string = '';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getExchangeRates().subscribe((response) => {
      this.fxRates = response.data;
    });

    this.currencyService.getCurrencies().subscribe((response) => {
      this.currencies = response.data;
      console.log(this.currencies);
    });
  }

  getRatesByCurrency(event: Event) {
    this.currencyService.getExchangeRatesByCurrency(event)
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

    const fromCurrencyFxRate = this.fxRates[this.fromCurrency][0].target_rate;
    const toCurrencyFxRate = this.fxRates[this.toCurrency][0].target_rate

    // source rate to 1 EUR
    const sourceCurrencyRateToEUR = 1 / parseFloat(fromCurrencyFxRate);
    const targetCurrencyRateToEUR = parseFloat(toCurrencyFxRate);
    const exchangeRate =  sourceCurrencyRateToEUR * targetCurrencyRateToEUR;

    const amountInEUR: number = this.amount * exchangeRate;

    this.convertExchangeRate = exchangeRate.toFixed(5);
    this.convertResult = amountInEUR.toFixed(5);
  }

  swapCurrencies():void {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;

    this.convertCurrency();
  }


}