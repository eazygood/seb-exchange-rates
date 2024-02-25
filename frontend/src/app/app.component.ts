import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, OnInit, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'frontend';
  data: FxRateData;
  // data: unknown;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('tut')
    this.showData();
  }

  showData() {
    this.http.get<FxRateResponseData>('http://localhost:5500/public/exchange-rates').subscribe(response => {
      this.data = response.data;
      console.log(this.data);
    })
    // this.http.request('GET', 'http://0.0.0.0:5500/public/exchange-rates', )
  }
}
