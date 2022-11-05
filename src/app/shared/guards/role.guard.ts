import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserApiService } from '../services/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private userService: UserApiService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.user) {
      if (this.userService.user.role.toUpperCase() == 'STUDENT') {
        this.router.navigate(['/', 'student']);
      } else {
        this.router.navigate(['/', 'teacher']);
      }

      return true;
    } else {
      this.router.navigate(['/', 'auth']);

      return false;
    }
  }

}
