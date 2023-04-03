import { Injectable } from "@angular/core";
import { TokenService } from "@features/auth";
import { User, UserApi } from "@features/user";
import { Store } from "@ngrx/store";
import { AppState } from "@store";
import { invokeFetchingUser, setUser } from "@store/actions";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  constructor(
    private readonly tokenService: TokenService,
    private readonly store: Store<AppState>
  ) {}

  public load(): void {
    this.initUserObserver();
  }

  public initUserObserver(): void {
    const token = this.tokenService.token;

    if (!token) {
      return;
    }

    const userId = this.tokenService.parseJWTToken(token).user_id;

    this.store.dispatch(invokeFetchingUser({ id: userId }));
  }
}
