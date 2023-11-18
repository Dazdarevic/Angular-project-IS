import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailModel } from 'src/app/models/email-model';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  sendEmail(email: string, subject: string, message: string): Observable<any> {
    const emailModel: EmailModel = {
      email: email,
      subject: subject,
      message: message
    };

    return this.http.post(this.baseUrl + '/User/SendEmail', emailModel);
  }
}
