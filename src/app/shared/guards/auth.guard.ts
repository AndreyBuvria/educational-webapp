import { HttpErrorResponse } from '@angular/common/http';
import { User, UserType } from './../interfaces/user.interface';
import { UserApiService } from './../services/user-api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Router, UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { map, Observable, switchMap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private cookie: CookieService, private auth: AuthService, private userService: UserApiService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //const path = route.routeConfig!.path;
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/', 'auth']);
      return false;
    }

    const path = route.data?.['role'];

    return this.checkAccess(path);
  }

  private checkAccess(path: string | undefined) {
    if (!path) return false;

    const accessToken = this.cookie.get('token_access');
    return this.auth.verifyUserRoleByToken(accessToken)
      .pipe(
        map((user: { role: UserType }) => user.role.toUpperCase() == path.toUpperCase()),
        catchError((requestError: HttpErrorResponse) => {
          if (accessToken.length === 0) {
            console.log('im here')
            const refreshTypeToken = this.cookie.get('token_refresh');
            return this.auth.refreshToken(refreshTypeToken)
              .pipe(
                switchMap((accessToken: { access: string}) => {
                  this.auth.setAccessToken(accessToken.access);
                  return this.auth.verifyUserRoleByToken(accessToken.access)
                    .pipe(map((user: { role: UserType }) => user.role.toUpperCase() == path.toUpperCase()))
                })
              )
          } else {
            return throwError(() => new Error(requestError.message));
          }
        })
      )
  }

}
