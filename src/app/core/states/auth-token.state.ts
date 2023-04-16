import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthTokenState {
  public isRefreshingToken = false;

  private _accessToken$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public get accessToken$() {
    return this._accessToken$.asObservable().pipe(
      filter(Boolean),
      take(1)
    );
  }

  public setToken(token: string | null) {
    this._accessToken$.next(token);
  }
}
