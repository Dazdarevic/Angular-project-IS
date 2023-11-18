import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  getCompany(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(this.baseUrl + `/Company/${id}`, { headers });
  }
  getAllCompanies(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `/Company/all-companies/${id}`);
  }
  getCity(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `/City/${id}`);
  }
  sendPhoto(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(this.baseUrl + `/Company/add-photo`, formData);
  }
  addCompany(company: Object): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(this.baseUrl + '/Company/add-company', company, { headers });
  }

  getCompaniesByUserId(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<any>(this.baseUrl + `/Company/by-user-id/${id}`, { headers });
  }
  getPanelsByUserId(id: number): Observable<any[]> { // Definišemo da očekujemo niz podataka
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<any[]>(this.baseUrl + `/AdvertisingPanel/by-user-id/${id}`, { headers });
  }
  getAllPanels(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + `/AdvertisingPanel`);
  }
  deletePanelById(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + `/AdvertisingPanel/delete-ad/${id}`);
  }
  deleteCompany(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + `/Company/delete-company/${id}`);
  }
}
