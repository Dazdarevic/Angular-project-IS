import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { CompanyServiceService } from '../../services/company-service/company-service.service';
import { AllAdsService } from '../../services/all-ads-service/all-ads.service';
import { DatePipe } from '@angular/common';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@Component({
  selector: 'all-ads-show',
  templateUrl: './all-ads-show.component.html',
  styleUrls: ['./all-ads-show.component.css']
})
export class AllAdsShowComponent implements OnInit{
  panels: any[] = [];
  user: any;
  deleteId: any;
  formattedDate!: any;
  searchText: string = "";
  City = '';
  SearchCity = '';
  SortbyParam = '';
  city: any;
  company: any;
  owner: any;
  companyEmail: any;
  companySector: any;
  companyTel: any;
  SortDirection = 'asc';


  constructor(
    private filterPipe: FilterPipe,
    private datePipe: DatePipe,
    private companyService: CompanyServiceService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {

    this.companyService.getAllPanels().subscribe((res) => {
      this.panels = res;
      // console.log("Objekat", res);

      for (const panel of this.panels) {
        console.log(panel.selectedCompany);
        this.companyService.getAllCompanies(panel.selectedCompany).subscribe((res) => {
          this.owner = res.companyOwner;
          this.company = res.companyName;
          this.companyEmail = res.companyEmail;
          this.companySector = res.companySector;
          this.companyTel = res.companyTel;
        });

        const cityID = panel.cityID;
        this.companyService.getCity(cityID).subscribe((res) => {
              this.city = res.nameOfCity;
              console.log(this.city)
        });
      }
    });
  }

  onCityFilter() {
    if (this.City !== '') {
      this.panels = this.filterPipe.transform(this.panels, this.City, 'cityArea');
    } else {
      this.onCityFilterClear();
    }
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }

  // Metoda za resetovanje filtera
  onCityFilterClear() {
    this.City = '';
    // this.onCityFilter();
    this.ngZone.run(() => {
      this.companyService.getAllPanels().subscribe((res) => {
        this.panels = res;
      })
    });
  }
}
