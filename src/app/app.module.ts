import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PhoneFormatPipe } from './pipes/phone-format.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule  } from '@angular/common/http';
import { UsersComponent } from './components/admin/user/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { ClientDashboardComponent } from './components/client/client-dashboard/client-dashboard.component';
import { ClientProfileComponent } from './components/client/client-profile/client-profile.component';
import { ClientCompanyComponent } from './components/client/client-company/client-company.component';
import { AdvertisementComponent } from './components/client/advertisement/advertisement.component';
import { AllAdvertisementsComponent } from './components/client/all-advertisements/all-advertisements.component';
import { AllAdsShowComponent } from './components/all-ads-show/all-ads-show.component';
import { DatePipe } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { MultipleFiltersPipe } from './pipes/multiple-filters.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    PhoneFormatPipe,
    UsersComponent,
    AdminProfileComponent,
    ClientDashboardComponent,
    ClientProfileComponent,
    ClientCompanyComponent,
    AdvertisementComponent,
    AllAdvertisementsComponent,
    AllAdsShowComponent,
    FilterPipe,
    SortPipe,
    MultipleFiltersPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: MultipleFiltersPipe, useClass: MultipleFiltersPipe},
    { provide: FilterPipe, useClass: FilterPipe},
    { provide: DatePipe, useClass: DatePipe }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
