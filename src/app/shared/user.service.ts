import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UserService {

  selectedUser : User;

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
  }
}
