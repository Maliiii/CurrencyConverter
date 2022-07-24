import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<JSON> {
    return this.http.get<JSON>(this.apiUrl + '/currencies', this.httpOptions);
  }

  getSingleCurrencyConversion(symbol: string): Observable<JSON> {
    return this.http.get<JSON>(this.apiUrl + '/currencies/' + symbol, this.httpOptions);
  }
}
