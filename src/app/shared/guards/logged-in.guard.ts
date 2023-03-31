import { AuthService } from '@features/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanLoad {

  constructor(private authService: AuthService) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isLoggedIn() ? false : true;
  }

}
