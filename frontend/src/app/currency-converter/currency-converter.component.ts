import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FxRatesService } from '../services/fx-rates.service';
import { FxRateData } from '../fx-rates/fx-rates.model';
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
  title = 'seb currency converter';
  fxRates: FxRateData;
  currencies: string[] = [];
  fromCurrency: string = '';
  toCurrency: string = '';
  amount: number | null = 1;
  convertResult: string = '';
  convertExchangeRate: string = '';

  constructor(private fxRatesService: FxRatesService) {}

  ngOnInit(): void {
    this.fxRatesService.getExchangeRates().subscribe((response) => {
      this.fxRates = response.data;
    });

    this.fxRatesService.getCurrencies().subscribe((response) => {
      this.currencies = response.data;
      console.log(this.currencies);
    });
  }

  convertCurrency(): void {
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