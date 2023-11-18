import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientProfileServiceService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  showData(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `/User/${id}`);
  }
}
