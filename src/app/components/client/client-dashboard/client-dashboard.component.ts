import { Component, OnInit, NgZone  } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors }
from '@angular/forms';
import { CompanyServiceService } from '../../../services/company-service/company-service.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit{
  logoUrl: any;
  msg = "";
  displayStyleEdit = "none";
  companyForm!: FormGroup;
  errMessage = '';
  photo: any;
  user: any;
  companies: any;
  selectedFile: any;


  constructor(
    private companyService: CompanyServiceService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router)
  {}

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      userID: [''],
      companyPIB: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      companyOwner: ['', Validators.required],
      companyEmail: ['', Validators.required],
      companySector: ['', Validators.required],
      companyLogo: ['', Validators.required],
      companyTel: ['', Validators.required],
      companyTel2: ['', Validators.required],
    });

    const token = localStorage.getItem('token');
      if (token) {
        this.user = jwt_decode(token);
        // console.log("ID ulogovanog korisnika:" + this.user.UserId);
      }

    console.log("ID: " + this.user.UserId)
    this.companyService.getCompaniesByUserId(this.user.UserId).subscribe((res) => {
      this.companies = res;
      console.log("Objekat", this.companies);
    });
  }

  getFile(event: any) {
    const file: File = event.target.files[0];
    console.log("file" + file);
    this.uploadPhoto(file);
  }


  uploadPhoto(file: File) {
    this.companyService.sendPhoto(file).subscribe(
      (response) => {
        this.selectedFile = response.url;
        console.log("slika2", this.selectedFile);
        console.log("Photo uploaded successfuly", response.url);
      },
      (error) => {
        console.log("Error " + error);
      }
    );
  }

  handleSubmit() {
    if (this.companyForm.valid) {
      console.log("slika", this.selectedFile); // Ovde je selectedFile još uvek undefined

      const token = localStorage.getItem('token');
      if (token) {
        this.user = jwt_decode(token);
        // console.log("ID ulogovanog korisnika:" + this.user.UserId);
      }
      const company = this.companyForm.value;
      company.userID = this.user.UserId;
      company.companyLogo = this.selectedFile;

      const id = this.user.UserId;
      // console.log("Podaci o kompaniji: " + company);
      this.companyService.addCompany(company).subscribe({
        next: () => {
          this.resetForm();
          this.ngZone.run(() => {
            this.companyService.getCompaniesByUserId(id).subscribe((res) => {
              this.companies = res;
            });
          });
          // console.log("Uspesno dodata kompanija");
        },
        error: (err) => {
          // console.log("greska", err);
        }
      });
    }
  }

  deleteCompany(id: any) : void {
    console.log(id);
    const confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete) {
      this.companyService.deleteCompany(id).subscribe({
        next: () => {
          this.ngZone.run(() => {
              const token = localStorage.getItem('token');
              if (token) {
                this.user = jwt_decode(token);
                // console.log("ID ulogovanog korisnika:" + this.user.UserId);
              }

            console.log("ID: " + this.user.UserId)
            this.companyService.getCompaniesByUserId(this.user.UserId).subscribe((res) => {
              this.companies = res;
              console.log("Objekat", this.companies);
            });
          });
        }, error: (err) => {
          console.log("Greska", err);
        }
      });
    }
  }

  addAdvertise() {
    this.router.navigate(['/advertisement']);
  }

  resetForm() {
    this.companyForm.reset();
    this.errMessage = '';
    this.displayStyleEdit = "none";
  }

  openPopup() {
    this.displayStyleEdit = "block";
  }

  closePopupEdit() {
    this.displayStyleEdit = "none";
  }

}
