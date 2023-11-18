import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; // Importujemo map operator

@Injectable({
  providedIn: 'root'
})
export class AllAdsService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPanelsByUserId(id: number): Observable<any[]> { // Definišemo da očekujemo niz podataka
    return this.http.get<any[]>(this.baseUrl + `/AdvertisingPanel/by-user-id/${id}`);
  }

  getCompaniesByUserId(id: number) : Observable<any> {
    return this.http.get<any>(this.baseUrl + `/Company/by-user-id/${id}`);
  }
}
