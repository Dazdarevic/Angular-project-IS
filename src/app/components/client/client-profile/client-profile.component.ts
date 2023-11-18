import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { ClientProfileServiceService } from '../../../services/client-profile-service/client-profile-service.service';
@Component({
  selector: 'client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  user: any;
  client: any;

  constructor(private clientProfileService: ClientProfileServiceService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.user = jwt_decode(token);
      console.log("ID CLIENT:" + this.user.UserId); //id ulogogavnog korisnika
      this.clientProfileService.showData(this.user.UserId)
      .subscribe(response => {
        console.log(response);
        this.client = response;
      });
    }
  }
}
