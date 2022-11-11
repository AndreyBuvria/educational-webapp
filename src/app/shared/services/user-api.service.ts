import { AuthService } from 'src/app/shared/services/auth.service';
import { UserType } from './../interfaces/user.interface';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSimple } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public getUsers(): Observable<any> {
    return this.http.get(environment.API_URL + 'users/');
  }

  public getUser(userID: number): Observable<any> {
    return this.http.get(environment.API_URL + 'users/' + userID + '/');
  }

  public storeUser(username: string, id: string, role: string) {
    localStorage.setItem('usrname', username);
    localStorage.setItem('usrid', id);
    localStorage.setItem('usrrole', role);
  }

  public getUserLocalData(): UserSimple | null {
    const id = localStorage.getItem('usrid')
    const username = localStorage.getItem('usrname');
    const role = localStorage.getItem('usrrole') as UserType;


    return id && username && role ? {
      id: id,
      username: username,
      role: role,
    } : null
  }


}
