// import { environment } from './../../../environments/environment';
import { Component, OnInit, NgZone  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
// import { Emitter } from '../../emitters/authEmitter';
import { UsersServiceService } from 'src/app/services/users-service/users-service.service';
import { environment } from 'src/app/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { MultipleFiltersPipe } from 'src/app/pipes/multiple-filters.pipe';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users: any;
  userName = null ;
  gender: string | undefined;
  phone = "2556522000";
  displayStyle = "none";
  displayStyleEdit = "none";
  success = true;
  registerForm!: FormGroup;
  editForm!: FormGroup;
  errMessage = '';
  SortbyParam = '';
  searchText: string = "";
  baseUrl = environment.baseUrl;
  url = this.baseUrl + '/User/role';

  constructor(
    private multipleFiltersPipe: MultipleFiltersPipe,
    private filterPipe: FilterPipe,
    private http: HttpClient,
    private usersService: UsersServiceService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    this.http.get(this.url, { headers})
      .subscribe(response => {
        console.log(response);
        this.users = response;
    });
  }

  ngOnInit(): void {

    this.usersService.accessUsers('client').subscribe((res) => {
      this.users = res;
      // console.log(res);
    });

    this.registerForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthdayDate: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^06[0-9]{8}$')]],
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
      repPassword: ['', [Validators.required, this.passwordMatchValidator]],
      userRole: ['', Validators.required],
      gender: ['', Validators.required],
      secureCode: ['']
    });

    this.editForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      userName: ['', Validators.required],
    });
  }

  onSearch() {
    if (this.searchText !== '') {
      const props = ['firstName', 'lastName', 'userEmail'];
      this.users = this.multipleFiltersPipe.transform(this.users, this.searchText, props);
    } else {
      this.onSearhClear();
    }
  }

  onSearhClear() {
    this.searchText = "";
    this.ngZone.run(() => {
      this.usersService.accessUsers('client').subscribe((res) => {
        this.users = res;
      });
    });
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('userPassword')?.value;
    const repeatedPassword = control.get('repPassword')?.value;

    return password === repeatedPassword ? null : { passwordMismatch: true };
  };

  handleUpdate() {
    const user = this.editForm.value;

    console.log(user);
    if (this.editForm.valid) {
      const user = this.editForm.value;

      console.log(user);

      this.usersService.updateUser(user.id, user).subscribe({
        next: () => {
          this.success = true;
          this.ngZone.run(() => {
            this.usersService.accessUsers('client').subscribe((res) => {
              this.users = res;
            });
          });

        }, error: (err) => {
          if (err.error.code) {
            this.errMessage = 'Try something else.';
          } else {
            this.errMessage = 'Something went wrong!!';
          }
        }
      });

      this.displayStyleEdit = "none";
    }
  }

  handleSubmit() {
    this.register();
  }
  register() {
    // if (this.registerForm.valid) {
    const userInfo = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      birthdayDate: this.registerForm.get('birthdayDate')?.value,
      gender: this.registerForm.get('gender')?.value,
      userEmail: this.registerForm.get('userEmail')?.value,
      phoneNumber: this.registerForm.get('phoneNumber')?.value,
      userName: this.registerForm.get('userName')?.value,
      userRole: this.registerForm.get('userRole')?.value,
      userPassword: this.registerForm.get('userPassword')?.value,
    };

      console.log(userInfo);
      // Enkodiranje lozinke
      const encodedPassword = btoa(userInfo.userPassword);
      userInfo.userPassword = encodedPassword;
      // user.phoneNumber = this.phoneFormatPipe.transform(user.phoneNumber);

      this.usersService.addUser(userInfo).subscribe({
        next: () => {
          this.success = true;
          this.ngZone.run(() => {
            this.usersService.accessUsers('client').subscribe((res) => {
              this.users = res;
            });
          });
        },
        error: (err) => {
          if (err.error.code) {
            this.errMessage = 'User already exists!! Try something else.';
            console.log(err.error.code);
          } else {
              this.errMessage = 'Something went wrong!!';
              console.log("GRESKA", err.error.code);
          }
        },
      });

      this.resetForm();
      this.closePopup();
      // this.route.navigate(['/login']);
    // }
    // else {
    //   console.log("nevalidni podaci");
    // }
  }

  deleteUser(id: number): void {
    console.log(id);
    const confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete) {
      this.usersService.deleteUser(id).subscribe({
        next: () => {
          this.ngZone.run(() => {
            this.usersService.accessUsers('client').subscribe((res) => {
              this.users = res;
            });
          });
        }, error: (err) => {
          console.log("Greska", err);
        }
      });
    }
  }

  getErrorMessage() : string {
    const formControls = this.registerForm.controls;

    if (formControls['firstName'].errors?.['required']) {
      return 'First Name is required.';
    } else if (formControls['lastName'].errors?.['required']) {
      return 'Last Name is required.';
    } else if (formControls['birthdayDate'].errors?.['required']) {
      return 'Birthday Date is required.';
    } else if (formControls['userEmail'].errors?.['required']) {
      return 'Email is required.';
    } else if (formControls['userEmail'].errors?.['pattern']) {
      return 'Invalid Email format.';
    } else if (formControls['phoneNumber'].errors?.['required']) {
      return 'Phone Number is required.';
    } else if (formControls['phoneNumber'].errors?.['pattern']) {
      return 'Invalid Phone Number format.';
    } else if (formControls['userName'].errors?.['required']) {
      return 'Username is required.';
    } else if (formControls['userPassword'].errors?.['required']) {
      return 'Password is required.';
    } else if (formControls['repPassword'].errors?.['required']) {
      return 'Repeated Password is required.';
    } else if (formControls['repPassword'].errors?.['passwordMismatch']) {
      return 'Passwords do not match.';
    } else if (formControls['userRole'].errors?.['required']) {
      return 'User Role is required.';
    } else if (formControls['gender'].errors?.['required']) {
      return 'Gender is required.';
    }

    return 'Fields are required.';

  }

  resetForm() {
    this.registerForm.reset();
    this.errMessage = '';
  }
  addUser(f: any) {

  }

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  openPopupEdit(user:any) : void {
      this.editForm.patchValue({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        userName: user.userName,
      });

      this.displayStyleEdit = "block";

  }
  closePopupEdit() {
    this.displayStyleEdit = "none";
  }
}
