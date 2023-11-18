import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/admin/user/users.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { ClientDashboardComponent } from './components/client/client-dashboard/client-dashboard.component';
import { ClientProfileComponent } from './components/client/client-profile/client-profile.component';
import { ClientCompanyComponent } from './components/client/client-company/client-company.component';
import { AdvertisementComponent } from './components/client/advertisement/advertisement.component';
import { AllAdsShowComponent } from './components/all-ads-show/all-ads-show.component';
import { AllAdvertisementsComponent } from './components/client/all-advertisements/all-advertisements.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin-profile', component: AdminProfileComponent, canActivate: [AuthGuard]},
  {path: 'client-profile', component: ClientProfileComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'client-dashboard', component: ClientDashboardComponent, canActivate: [AuthGuard]},
  {path: 'client-company', component: ClientCompanyComponent, canActivate: [AuthGuard]},
  {path: 'advertisement', component: AdvertisementComponent, canActivate: [AuthGuard]},
  {path: 'all-advertisements', component: AllAdvertisementsComponent, canActivate: [AuthGuard]},
  {path: 'all-ads-show', component: AllAdsShowComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
