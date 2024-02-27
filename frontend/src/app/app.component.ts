import { Component, OnInit } from '@angular/core';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyConverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
