import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
 providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  role: any;
  user: any;
  constructor(private router: Router) { }

  canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const { routeConfig } = route;
    const { path } = routeConfig as Route;

    const token = localStorage.getItem('token');
    if (token) {
      this.user = jwt_decode(token);
      this.role = this.user.UserRole;
      console.log(this.role);

      if ((path?.includes('admin-profile') || path?.includes('users')) && (this.role === 'admin')) {
        return true;
      }

      if ((path?.includes('all-advertisements') || path?.includes('advertisement') ||
        path?.includes('client-company') || path?.includes('client-dashboard')
        || path?.includes('client-profile'))
        && (this.role === 'client')) {
        return true;
      }
    }
      this.router.navigate(['/login']);
      return false;
 }
}
