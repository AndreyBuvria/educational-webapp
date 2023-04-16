import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { Store } from "@ngrx/store";
import { AppState } from "@store";
import { clearUser } from "@store/actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly store: Store<AppState>
  ) {}

  public logout() {
    this.tokenService.removeToken();
    this.store.dispatch(clearUser());
  }
}
