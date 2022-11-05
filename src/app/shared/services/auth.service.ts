import { environment } from './../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { TokenJWT, User, UserLogin, UserSignup } from './../interfaces/user.interface';
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
    return this.http.post(environment.API_URL + 'token/refresh/', refreshToken);
  }

  public verifyToken(token: string): Observable<any> {
    return this.http.post(environment.API_URL + 'token/verify/', token);
  }
}
