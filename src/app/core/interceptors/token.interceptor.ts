import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, finalize, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { TokenService, TokenApi, TokenResponse } from '@features/auth';
import { AuthTokenState } from '@core/states';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private cookie: CookieService,
    private tokenService: TokenService,
    private tokenApi: TokenApi,
    private authTokenState: AuthTokenState
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addTokenToReq(req)).pipe(
      catchError((requestError: HttpErrorResponse) => {
        if (requestError && requestError.status === 401) {
          if (this.authTokenState.isRefreshingToken) {
            return this.authTokenState.accessToken$.pipe(
              switchMap(() => next.handle(this.addTokenToReq(req)))
            );
          } else {
            return this.refreshToken(req, next);
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

  private refreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    const refreshToken = this.cookie.get('token_refresh');

    this.authTokenState.isRefreshingToken = true;
    this.authTokenState.setToken(null);

    return this.tokenApi.refreshToken(refreshToken).pipe(
      tap((token: TokenResponse) => {
        this.tokenService.setAccessToken(token.access);
      }),
      switchMap((token: TokenResponse) => {
        this.authTokenState.setToken(token.access);
        this.authTokenState.isRefreshingToken = false;

        return next.handle(this.addTokenToReq(req));
      }),
      catchError(() => {
        this.authTokenState.isRefreshingToken = false;
        return throwError(() => new Error('Failed to refresh token'))
      })
    );
  }
}

