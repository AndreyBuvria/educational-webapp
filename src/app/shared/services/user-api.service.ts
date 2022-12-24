import { User } from './../interfaces/user.interface';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.API_URL + 'users/');
  }

  public getUser(userID: number): Observable<User> {
    return this.http.get<User>(environment.API_URL + 'users/' + userID + '/');
  }

  public storeUser(user: User) {
    localStorage.setItem('usr', JSON.stringify(user));
  }

  public getUserLocalData(): User | null {
    const usrData = localStorage.getItem('usr');
    return usrData ? JSON.parse(usrData) : null;
  }

}
