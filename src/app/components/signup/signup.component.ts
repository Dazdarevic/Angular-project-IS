import { Component, OnInit } from '@angular/core';
// import { PhoneFormatPipe } from '../phone-format.pipe';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SignupService } from '../../services/signup-service/signup.service';
import { Router } from '@angular/router';
import { SendEmailService } from '../../services/send-email-service/send-email.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  gender: string | undefined;
  phone = "2556522000";
  showSecureCodeField = false;
  registerForm!: FormGroup;
  success = false;
  errMessage = '';
  randomNumber = Math.floor(10000 + Math.random() * 90000);


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private signupService: SignupService,
    private route: Router,
    // private phoneFormatPipe: PhoneFormatPipe,
    private sendEmailService: SendEmailService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
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
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('userPassword')?.value;
    const repeatedPassword = control.get('repPassword')?.value;

    return password === repeatedPassword ? null : { passwordMismatch: true };
  };

  handleSubmit() {
    this.register();
  }

  register() {
    if (this.showSecureCodeField) {
      this.registerUser();
    } else {
      this.sendEmail();
    }
  }


  sendEmail() {
    if (this.registerForm.valid) {
      console.log("RADI SLANJE EMAIL-a");

      const user = this.registerForm.value;
      this.sendEmailService.sendEmail(user.userEmail, "Secure Code", "Your Secure Code: " +
        this.randomNumber).subscribe({
        next: () => {
          this.success = true;
          this.showSecureCodeField = true;
        }, error: (err) => {
          if (err.error.code) {
            this.errMessage = 'User already exists!! Try something else.';
          } else {
            this.errMessage = 'Email doesnt send!!';
          }
        },
    })
    }
  }

  registerUser() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;

      if (user.secureCode == this.randomNumber) {
      // Enkodiranje lozinke
      const encodedPassword = btoa(user.userPassword);
      user.userPassword = encodedPassword;
      // user.phoneNumber = this.phoneFormatPipe.transform(user.phoneNumber);
      console.log(user);

      this.signupService.register(user).subscribe({
        next: () => {
          this.success = true;
        },
        error: (err) => {
          if (err.error.code) {
            this.errMessage = 'User already exists!! Try something else.';
          } else {
            this.errMessage = 'Something went wrong!!';
          }
        },
      });

      this.resetForm();
      this.route.navigate(['/login']);
    }
  } else {
      this.errMessage = this.getErrorMessage();
    }
  }

  resetForm() {
    this.registerForm.reset();
    this.errMessage = '';
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
}

