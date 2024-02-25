import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { RouterOutlet } from '@angular/router';

interface FxRateData {
  [currency: string]: FxRate[];
}

interface FxRate {
  date: string;
  source_rate: string,
  target_rate: string,
}
interface FxRateResponseData {
  data: FxRateData,
  currencies: [],
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'frontend';
  data: FxRateData;
  selectedCurrency: string = 'JPY';
  rates: FxRateData;
  currencies: string[] = [];
  fromCurrency: string = '';
  toCurrency: string = '';
  amount: number | null = 1;

  // data: unknown;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('tut')
    this.showData();
  }


  showData() {
    this.http.get<FxRateResponseData>('http://localhost:5500/public/exchange-rates').subscribe(response => {
      this.data = response.data;
      this.currencies = response.currencies;
    })
    // this.http.request('GET', 'http://0.0.0.0:5500/public/exchange-rates', )
  }

  getFxRatesByCurrency(event: Event) {
    const currency = (event.target as HTMLInputElement).value;
    this.http.get<FxRateResponseData>(`http://localhost:5500/public/exchange-rates/${currency}`).subscribe(response => {
      this.rates = response.data;
      console.log(this.rates);
    })
  }

  convertCurrency(): void {
    // Perform conversion logic here based on selected currencies and amount
    console.log(this.amount, this.fromCurrency, this.toCurrency)
    console.log(`Converting ${this.amount} from ${this.fromCurrency} to ${this.toCurrency}`);
    // console.log(`Converting ${amount} from ${fromCurrency} to ${toCurrency}`);
    this.http.post<FxRateResponseData>(`/exchange-rates/calculate`, {
      source_currency: this.fromCurrency,
      target_currency: this.toCurrency,
      amount: this.amount,
    }).subscribe(response => {
      console.log(response);
    })
  }
}
