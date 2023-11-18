import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { CompanyServiceService } from '../../../services/company-service/company-service.service';
import { AllAdsService } from '../../../services/all-ads-service/all-ads.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'all-advertisements',
  templateUrl: './all-advertisements.component.html',
  styleUrls: ['./all-advertisements.component.css']
})
export class AllAdvertisementsComponent implements OnInit{
  panels: any[] = [];
  user: any;
  deleteId: any;
  city: any;
  owner: any;
  companyEmail: any;
  companySector: any;
  company: any;
  companyTel: any;
  numberOfDays: any;
  formattedDate!: any;

  constructor(
    private datePipe: DatePipe,
    private companyService: CompanyServiceService,
    private ngZone: NgZone
  ) {}

  async ngOnInit(): Promise<void> {

    const token = localStorage.getItem('token');
    if (token) {
      this.user = jwt_decode(token);
    }

    console.log(this.user.UserId);
    this.companyService.getPanelsByUserId(57).subscribe(async (res) => {
      this.panels = res;
      console.log("Objekat", res);

      for (const panel of this.panels) {
        const fromDate = new Date(panel.fromDate);
        const toDate = new Date(panel.toDate);
        const today = new Date();
        this.formattedDate = this.datePipe.transform(today, 'yyyy-MM-dd');
        console.log(this.formattedDate);

        const todayDate = new Date(this.formattedDate);

        const differenceInDays =
          Math.floor((toDate.getTime() - todayDate.getTime()) / (1000 * 3600 * 24));

        panel.numberOfDays = differenceInDays;
        if (differenceInDays === 0 || differenceInDays<0) {
          console.log("Objekat sa razlikom od 0 dana:", panel.panelID);
          await this.companyService.deletePanelById(panel.panelID).toPromise();
          // Izbrisem panel i sačekam dok ne završi
        }

        console.log(panel.cityID);
          this.companyService.getCity(panel.cityID).subscribe((res) => {
            this.city = res.nameOfCity;
            console.log(this.city);
          })
        this.companyService.getCompany(panel.selectedCompany).subscribe((res) => {
          this.company = res.companyName;
          this.owner = res.companyOwner;
          this.companyEmail = res.companyEmail;
          this.companySector = res.companySector;
          this.companyTel = res.companyTel;
          })
      }

    });
  }
}
