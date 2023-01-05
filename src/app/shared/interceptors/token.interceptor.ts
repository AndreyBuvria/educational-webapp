import { AuthApiService } from './../services/auth-api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, finalize, Observable, switchMap, take, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject(null);

  constructor(
    private cookie: CookieService,
    private authService: AuthService,
    private autApihService: AuthApiService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addTokenToReq(req)).pipe(
      catchError((requestError: HttpErrorResponse) => {
        if (requestError && requestError.status === 401) {
          if (this.refreshTokenInProgress) {
            return this.refreshTokenSubject.pipe(
              filter((result: any) => result),
              take(1),
              switchMap(() => next.handle(this.addTokenToReq(req)))
            );
          } else {
            const refreshToken = this.cookie.get('token_refresh');

            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);

            return this.autApihService.refreshToken(refreshToken).pipe(
              switchMap((token) => {
                this.refreshTokenSubject.next(token.access);
                this.authService.setAccessToken(token.access);
                return next.handle(this.addTokenToReq(req));
              }),
              finalize(() => { this.refreshTokenInProgress = false })
            );
          }
        } else {
          return throwError(() => new Error(requestError.message));
        }
      })
    )
  }

  private addTokenToReq(req: HttpRequest<any>) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.cookie.get('token_access')}`
      }
    });
  }
}

