import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  public user!: User;

  constructor(private http: HttpClient,) { }

  public getUsers(): Observable<any> {
    return this.http.get(environment.API_URL + 'users/');
  }

  public getUser(userID: number, token_access: string): Observable<any> {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + token_access});
    return this.http.get(environment.API_URL + 'users/' + userID + '/', {headers: headers});
  }
}
