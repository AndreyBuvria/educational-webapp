import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { TokenBody, TokenJWT } from '../../user-common/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookie: CookieService) {
  }

  public removeToken() {
    if (this.cookie.check('token_access')) this.cookie.delete('token_access', '/');
    if (this.cookie.check('token_refresh')) this.cookie.delete('token_refresh', '/');
  }

  public parseJWTToken(token: string): TokenBody {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  public setTokenCookie(token: TokenJWT) {
    const cookieExists: boolean = this.accessTokenExists() || this.refreshTokenExists();

    if (cookieExists) {
      this.cookie.delete('token_access');
      this.cookie.delete('token_refresh');
    }

    this.setAccessToken(token.access);
    this.setRefreshToken(token.refresh);
  }

  public setAccessToken(token: string) {
    const tokenBody: TokenBody = this.parseJWTToken(token);
    const expires: Date = new Date(0);
    expires.setUTCSeconds(tokenBody.exp);
    this.cookie.set('token_access', token, expires, '/');
  }

  public setRefreshToken(token: string) {
    const tokenBody: TokenBody = this.parseJWTToken(token);
    const expires: Date = new Date(0);
    expires.setUTCSeconds(tokenBody.exp);
    this.cookie.set('token_refresh', token, expires, '/');
  }

  public refreshTokenExists() {
    return this.cookie.check('token_refresh');
  }

  public accessTokenExists() {
    return this.cookie.check('token_access');
  }

  public isLoggedIn(): boolean {
    const isLogged = Boolean(this.cookie.check('token_refresh') && localStorage.getItem('usr'));
    if (!isLogged) this.onLogout();
    return isLogged;
  }

  public onLogout() {
    this.removeToken();
    if (localStorage.getItem('usr')) localStorage.removeItem('usr');
  }
}
