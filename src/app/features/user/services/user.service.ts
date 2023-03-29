import { Observable, BehaviorSubject, switchMap, of, shareReplay } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { UserApi } from '../apis';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userID$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public users$: Observable<User[]> = this.userApi.getUsers()
    .pipe(
      shareReplay(1)
  );
  private _user$: Observable<User | null> = this.userID$
    .pipe(
      switchMap((id: number | null) => {
        return id ? this.userApi.getUser(id) : of(null);
      }),
      shareReplay(1)
  );

  public get userIDValue() {
    return this.userID$.getValue();
  }

  public getUser(id?: number | string): Observable<User | null> {
    if (id) return this.userApi.getUser(id);

    return this._user$;
  }

  constructor(private userApi: UserApi) { }

  public storeUser(user: User) {
    localStorage.setItem('usr', JSON.stringify(user));
  }

  public getUserLocalData(): User | null {
    const usrData = localStorage.getItem('usr');
    return usrData ? JSON.parse(usrData) : null;
  }
}
