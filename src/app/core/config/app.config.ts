import { Injectable } from "@angular/core";
import { AuthTokenState } from "@core/states";
import { TokenService } from "@features/auth";
import { Store } from "@ngrx/store";
import { AppState } from "@store";
import { invokeFetchingUser, setUser } from "@store/actions";

@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  constructor(
    private readonly tokenService: TokenService,
    private readonly store: Store<AppState>,
    private readonly authTokenState: AuthTokenState
  ) {}

  public load(): void {
    this.initUserObserver();
  }

  public initUserObserver(): void {
    const token = this.tokenService.token;

    this.authTokenState.accessToken$.subscribe((data) => {
      this.invokeFetchingUser(data);
    });

    if (!token) {
      return;
    }

    this.invokeFetchingUser(token);
  }

  private invokeFetchingUser(token: string) {
    const userId = this.tokenService.parseJWTToken(token).user_id;

    this.store.dispatch(invokeFetchingUser({ id: userId }));
  }
}
