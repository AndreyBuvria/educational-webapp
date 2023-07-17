import { Injectable } from "@angular/core";
import { TokenService } from "@features/auth";
import { Store } from "@ngrx/store";
import { AppState } from "@store";
import { invokeFetchingUser, setUser } from "@store/actions";
import { selectUser } from "@store/selectors";
import { Observable, Subscriber, filter, take, takeUntil } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  constructor(
    private readonly tokenService: TokenService,
    private readonly store: Store<AppState>,
  ) {}

  public load(): Observable<void> {
    return new Observable((subscribe: Subscriber<any>) => {
      const token = this.tokenService.token;

      if (!token) {
        subscribe.complete();
      }

      const parsedToken = this.tokenService.parseJWTToken(token);
      const userId = parsedToken.user_id;

      this.store.dispatch(invokeFetchingUser({ id: userId }));

      this.store.select(selectUser)
        .pipe(
          filter(Boolean),
          take(1)
        )
        .subscribe(() => subscribe.complete())

      return {
        unsubscribe() {},
      }
    });
  }
}
