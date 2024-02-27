import { Component, OnInit } from '@angular/core';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { FxRatesComponent } from './fx-rates/fx-rates.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FxRatesComponent, CurrencyConverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
