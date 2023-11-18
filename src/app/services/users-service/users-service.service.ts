import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  accessUsers(role: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(this.baseUrl + `/User/role?role=${role}`, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const url = this.baseUrl + `/User/delete/${id}`;
    return this.http.delete(url, { headers });
  }

  addUser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(this.baseUrl + '/User/add', user, { headers });
  }

  updateUser(id: number, user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put(this.baseUrl + `/User/updateUser/${id}`, user, { headers });
  }
}
