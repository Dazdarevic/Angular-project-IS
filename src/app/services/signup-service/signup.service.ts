import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  register(user: object): Observable<any> {
    return this.http.post(this.baseUrl + '/User/add', user);
  }

}
