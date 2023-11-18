import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login-service/login.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  role: any;
  loginForm!: FormGroup;
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userEmail: ['',Validators.required],
      userPassword: ['',Validators.required],
    })
  }

  // login() {
  //   if (this.loginForm.valid) {

  //     const formValue = this.loginForm.value;
  //     console.log("User Email: " + formValue.userEmail + " User Password: " + formValue.userPassword);

  //     const encodedPassword = btoa(formValue.userPassword);
  //     formValue.userPassword = encodedPassword;
  //     console.log(encodedPassword);

  //     this.loginService.login(formValue).subscribe({
  //       next: (res) => {
  //         console.log("ovo se prikazuje" + res);
  //         localStorage.setItem('token', res.accessToken);


  //         const token = localStorage.getItem('token');
  //         if (token) {
  //           this.role = jwt_decode(token);
  //           this.role = this.role.UserRole;
  //         }

  //         console.log("ULOGA: " + this.role);
  //         if (this.role == "client") {
  //           this.router.navigate(['/client-dashboard']);
  //         } else {
  //           this.router.navigate(['/users']);
  //         }

  //       }, error: (err) => {
  //         this.message = 'Invalid username or password.';
  //         console.log(err)
  //       }
  //     })
  //   }
  //   else {
  //     this.message = 'Invalid Email or Password.';
  //   }
  // }

  login() {
    console.log("login() funkcija pozvana."); // Dodajte ovde

    if (this.loginForm.valid) {
      console.log("Forma je validna."); // Dodajte ovde

      const formValue = this.loginForm.value;
      console.log("User Email: " + formValue.userEmail + " User Password: " + formValue.userPassword);

      const encodedPassword = btoa(formValue.userPassword);
      formValue.userPassword = encodedPassword;
      console.log("Enkodirana lozinka: " + encodedPassword);

      this.loginService.login(formValue).subscribe({
        next: (res) => {
          console.log("Odgovor sa servera: ", res); // Dodajte ovde

          localStorage.setItem('token', res.accessToken);

          const token = localStorage.getItem('token');
          if (token) {
            this.role = jwt_decode(token);
            this.role = this.role.UserRole;
          }
          console.log("ULOGA: " + this.role);

          if (this.role == "client") {
            console.log("Korisnik je klijent. Preusmeravanje na /client-dashboard"); // Dodajte ovde
            this.router.navigate(['/client-dashboard']);
          } else {
            console.log("Korisnik je neki drugi tip korisnika. Preusmeravanje na /users"); // Dodajte ovde
            this.router.navigate(['/users']);
          }

        }, error: (err) => {
          this.message = 'Invalid username or password.';
          console.log("Greška sa servera: ", err); // Dodajte ovde
        }
      })
    } else {
      this.message = 'Invalid Email or Password.';
      console.log("Forma nije validna."); // Dodajte ovde
    }
  }

}
