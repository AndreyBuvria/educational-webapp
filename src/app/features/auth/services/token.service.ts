import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { TokenEnum } from '../enums';
import { TokenBody, TokenResponse } from '../interfaces';
import { AuthTokenState } from '@core/states';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public get token(): string {
    return this.cookie.get(TokenEnum.AccessToken);
  }

  constructor(
    private cookie: CookieService,
    private tokenState: AuthTokenState
  ) {}

  public removeToken() {
    this.cookie.delete(TokenEnum.AccessToken, '/');
    this.cookie.delete(TokenEnum.RefreshToken, '/');
  }

  public parseJWTToken(token: string): TokenBody {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  public storeToCookie(token: TokenResponse) {
    const cookieExists: boolean = this.accessTokenExists() || this.refreshTokenExists();

    if (cookieExists) {
      this.cookie.delete(TokenEnum.AccessToken);
      this.cookie.delete(TokenEnum.RefreshToken);
    }

    this.setAccessToken(token.access);
    this.setRefreshToken(token.refresh);
  }

  public setAccessToken(token: string) {
    const tokenBody: TokenBody = this.parseJWTToken(token);
    const expires: Date = new Date(0);
    expires.setUTCSeconds(tokenBody.exp);
    this.cookie.set('token_access', token, expires, '/');

    this.tokenState.setToken(token);
  }

  public setRefreshToken(token: string) {
    const tokenBody: TokenBody = this.parseJWTToken(token);
    const expires: Date = new Date(0);
    expires.setUTCSeconds(tokenBody.exp);
    this.cookie.set('token_refresh', token, expires, '/');
  }

  public refreshTokenExists() {
    return this.cookie.check(TokenEnum.RefreshToken);
  }

  public accessTokenExists() {
    return this.cookie.check(TokenEnum.AccessToken);
  }

  public isLoggedIn(): boolean {
    const isLogged = this.cookie.check(TokenEnum.RefreshToken);
    return isLogged;
  }
}
