import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin, UserSignup } from '../../user-common/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient,) { }

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
    return this.http.post(environment.API_URL + 'token/verify/', { token: token});
  }

  public verifyUserRoleByToken(accessToken: string): Observable<any> {
    return this.http.post(environment.API_URL + 'role/verify/', { access: accessToken});
  }
}
