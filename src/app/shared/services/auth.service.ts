import { environment } from './../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UserLogin, UserSignup } from './../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  public signup(data: UserSignup): Observable<any> {
    return this.http.post(environment.API_URL + 'signup/', data);
  }

  public obtainToken(data: UserLogin): Observable<any> {
    return this.http.post(environment.API_URL + 'token/', data);
  }

  public refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(environment.API_URL + 'token/refresh/', { refresh: refreshToken });
  }

  public verifyToken(token: string): Observable<any> {
    return this.http.post(environment.API_URL + 'token/verify/', token);
  }

  public removeToken() {
    this.cookie.delete('token_refresh', '/');
    this.cookie.delete('token_access', '/');
    localStorage.removeItem('usr');
  }

  public parseUserAccessToken(token_access: string) {
    let base64Url = token_access.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  public refreshTokenExists() {
    return this.cookie.check('token_refresh');
  }

  public accessTokenExists() {
    return this.cookie.check('token_access');
  }
}
