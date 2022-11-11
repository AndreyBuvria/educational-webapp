import { UserApiService } from './../services/user-api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cookie: CookieService, private userService: UserApiService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.cookie.check('token_refresh') || !this.userService.getUserLocalData()) {
      this.router.navigate(['/', 'auth']);
      return false;
    }

    return true;
  }

}
