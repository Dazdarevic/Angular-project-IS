import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AdminProfileService } from '../../../services/admin-profile-service/admin-profile.service';

@Component({
  selector: 'admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  user: any;
  admin: any;

  constructor(private adminProfileService: AdminProfileService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.user = jwt_decode(token);
      console.log("ID ADMINA:" + this.user.UserId); //id ulogogavnog korisnika
      this.adminProfileService.showData(this.user.UserId)
      .subscribe(response => {
        console.log(response);
        this.admin = response;
      });
    }
  }
}
