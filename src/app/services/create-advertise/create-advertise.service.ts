import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateAdvertiseService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  addAdvertise(advertisingPanel : Object) : Observable<any> {
    return this.http.post(this.baseUrl + `/AdvertisingPanel/add-advertisement`, advertisingPanel);
  }

  getCities() : Observable<any> {
    return this.http.get(this.baseUrl + '/City');
  }

  getCityAreas(cityID: any) : Observable<any> {
    return this.http.get(this.baseUrl + `/CityArea/by-city-id/${cityID}`);
  }

  getCompaniesByUserId(userId: any): Observable<any> {
    return this.http.get(this.baseUrl + `/Company/mycompanies/${userId}`);
  }

  sendPhoto(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(this.baseUrl + `/CityArea/add-photo`, formData);
  }
}
