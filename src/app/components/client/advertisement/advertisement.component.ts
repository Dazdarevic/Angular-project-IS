import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CreateAdvertiseService } from '../../../services/create-advertise/create-advertise.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {
  errMessage = '';
  addAdvertise!: FormGroup;
  minDate!: string;
  minDate2!: string;
  cities: any[] = [];
  cityAreas: any[] = [];
  selectedOption: any;
  companies: any[] = [];
  userId: any;
  user: any;
  selectedFile: any;
  advertisement: any[] = [];

  constructor(
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private createAdvertise: CreateAdvertiseService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.minDate = today;

    this.addAdvertise = this.formBuilder.group({
      selectedCity: ['', Validators.required],
      selectedCityArea: ['', Validators.required],
      selectedCompany: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      toDate: ['', Validators.required],
      fromDate: ['', Validators.required],
      lights: ['', Validators.required],
      dimension: ['', Validators.required],
      advertisementPhoto: ['', Validators.required],
      address: ['', Validators.required],
      numberOfDays: [''],
      // price: [''],
      // cityArea: [''],
      // cityID: ['']
    });

    const token = localStorage.getItem('token')?.toString();
    if (token) {
      this.userId = jwt_decode(token);
      this.userId = this.userId.UserId;
    }
    console.log(this.userId);
    this.getCities();
    this.getCompanies(this.userId);
  }

  setMinDate() {
    const fromDate = this.addAdvertise.get('fromDate')?.value;
    const fromDateObj = new Date(fromDate); // Kreiramo novi objekat Date na osnovu fromDate

    // Uvećavamo minDate2 za jedan dan
    fromDateObj.setDate(fromDateObj.getDate() + 1);

    // Pretvaramo objekat Date u string u formatu 'YYYY-MM-DD'
    this.minDate2 = fromDateObj.toISOString().slice(0, 10);
    // console.log(this.minDate2);
  }

  getCompanies(userId: any) {
    this.createAdvertise.getCompaniesByUserId(userId).subscribe((data: any[]) => {
      this.companies = data;
    })
  }
  onCityChange() {
    const selectedCityId = this.addAdvertise.get('selectedCity')?.value;
    this.getCityAreas(selectedCityId);
  }

  getCityAreas(cityID: any) {
    this.createAdvertise.getCityAreas(cityID).subscribe((data: any[]) => {
      this.cityAreas = data;
      console.log(this.cityAreas);
    })
  }
  getCities() {
    this.createAdvertise.getCities().subscribe((data: any[]) => {
      this.cities = data;
     });
  }

  getFile(event: any) {
    const file: File = event.target.files[0];
    console.log("file" + file);
    this.uploadPhoto(file);
  }


  uploadPhoto(file: File) {
    this.createAdvertise.sendPhoto(file).subscribe(
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
    // if (this.addAdvertise.valid) {
      console.log("slika", this.selectedFile); // Ovde je selectedFile još uvek undefined

      const token = localStorage.getItem('token');
      if (token) {
        this.user = jwt_decode(token);
        // console.log("ID ulogovanog korisnika:" + this.user.UserId);
      }
      const advertisement = this.addAdvertise.value;
      advertisement.userID = this.user.UserId;
      advertisement.advertisementPhoto = this.selectedFile;

      console.log("SLIKA", this.selectedFile);
    console.log("Objekat", this.addAdvertise.value);

    const selectedCityAreaValue = this.addAdvertise.get('selectedCityArea')?.value;

    console.log('Selektovana vrednost selectedCityArea:', selectedCityAreaValue);

      advertisement.cityID = this.addAdvertise.get('selectedCity')?.value.toString();
      advertisement.cityArea = this.addAdvertise.get('selectedCityArea')?.value.toString();

      const fromDate = this.addAdvertise.get('fromDate')?.value;
      const toDate = this.addAdvertise.get('toDate')?.value;

      // date stringovi u Date objekte
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);

      // razlika u milisekundama
      const differenceInMilliseconds = toDateObj.getTime() - fromDateObj.getTime();

      // Pretvori razliku u dane
      const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
    console.log('Razlika u danima:', differenceInDays);

    console.log(differenceInDays * 100);
    advertisement.price = (differenceInDays * 100).toString();
      advertisement.numberOfDays = differenceInDays.toString();

      const id = this.user.UserId;
      console.log("Podaci o reklami: " + advertisement);
      this.createAdvertise.addAdvertise(advertisement).subscribe({
        next: () => {
          this.resetForm();
          this.ngZone.run(() => {
            // this.createAdvertise.getCompaniesByUserId(id).subscribe((res) => {
            //   this.companies = res;
            // });
          });
          console.log("Uspesno dodata reklama");
          alert('Advertisement has been added successfully.');
          window.location.reload();
        },
        error: (err) => {
          console.log("greska", err);
        }
      });
    // }
  }

  resetForm() {
    this.addAdvertise.reset();
    this.errMessage = '';

  }
  // deleteCompany(id: any) : void {
  //   console.log(id);
  //   const confirmDelete = window.confirm('Are you sure?');
  //   if (confirmDelete) {
  //     this.createAdvertise.deleteCompany(id).subscribe({
  //       next: () => {
  //         this.ngZone.run(() => {
  //             const token = localStorage.getItem('token');
  //             if (token) {
  //               this.user = jwt_decode(token);
  //               // console.log("ID ulogovanog korisnika:" + this.user.UserId);
  //             }

  //           console.log("ID: " + this.user.UserId)
  //           this.companyService.getCompaniesByUserId(this.user.UserId).subscribe((res) => {
  //             this.companies = res;
  //             console.log("Objekat", this.companies);
  //           });
  //         });
  //       }, error: (err) => {
  //         console.log("Greska", err);
  //       }
  //     });
  //   }
  //   this.calculateDateDifference(); //razlika u danima, prikazuje broj dana, trebace mi za racunanje cene

  // }

  // handleSubmit() {
  //   this.calculateDateDifference(); //razlika u danima, prikazuje broj dana, trebace mi za racunanje cene
  // }
}

