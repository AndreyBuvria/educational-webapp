import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  public getUsers(): Observable<any> {
    return this.http.get(environment.API_URL + 'users/');
  }

  public getUser(userID: number): Observable<any> {
    return this.http.get(environment.API_URL + 'users/' + userID + '/');
  }

  public storeUser(username: string, id: string, role: string) {
    const userData = {
      id: id,
      username: username,
      role: role
    }
    localStorage.setItem('usr', JSON.stringify(userData));
  }

  public getUserLocalData(): UserSimple | null {
    const usrData = localStorage.getItem('usr');

    return usrData ? JSON.parse(usrData) : null;
  }

  public onLogout() {
    this.auth.removeToken();
    this.router.navigate(['/', 'auth']);
  }

}
