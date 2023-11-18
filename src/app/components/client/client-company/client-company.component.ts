import { Component, OnInit, NgZone  } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { CompanyServiceService } from '../../../services/company-service/company-service.service';

@Component({
  selector: 'client-company',
  templateUrl: './client-company.component.html',
  styleUrls: ['./client-company.component.css']
})
export class ClientCompanyComponent implements OnInit {
  companies: any;
  user: any;

  constructor(
    private companyService: CompanyServiceService,
    private NgZone: NgZone
  ) {}
  ngOnInit(): void {

    const token = localStorage.getItem('token');
      if (token) {
        this.user = jwt_decode(token);
        // console.log("ID ulogovanog korisnika:" + this.user.UserId);
      }

    console.log("ID: " + this.user.UserId)
    this.companyService.getCompaniesByUserId(this.user.UserId).subscribe((res) => {
      this.companies = res;
      // console.log("Objekat", this.companies);
    });

  }
}
