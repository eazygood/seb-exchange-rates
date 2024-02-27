import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FxRatesService } from '../services/fx-rates.service';
import { FxRateData } from './fx-rates.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fx-rates',
  templateUrl: './fx-rates.component.html',
  styleUrls: ['./fx-rates.component.css',],
  imports: [RouterOutlet, HttpClientModule, CommonModule, FormsModule],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})

export class FxRatesComponent implements OnInit {
  title = 'seb exchange rates table';
  rates: FxRateData;
  currencies: string[] = [];

  constructor(private fxRatesService: FxRatesService) {}

  ngOnInit(): void {
    this.fxRatesService.getCurrencies().subscribe((response) => {
        console.log(response.data);
      this.currencies = response.data;
    });
  }

  getRatesByCurrency(event: Event) {
    this.fxRatesService.getExchangeRatesByCurrency(event)
      .subscribe((response) => {
        this.rates = response.data;
      });
  }
}