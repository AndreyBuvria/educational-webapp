import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from '../actions/auth.actions';
import { TokenResponse, TokenService } from "@features/auth";
import { TokenApi } from '@features/auth/apis/token.api';
import { catchError, exhaustMap, of, switchMap } from "rxjs";
import { UserLogin } from "@features/user";
import { invokeFetchingUser } from "@store/actions";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.login),
        exhaustMap((action) => {
          const data: UserLogin = {
            username: action.username,
            password: action.password
          };

          return this.tokenApi.obtainToken(data).pipe(
            switchMap((tokenResponse: TokenResponse) => {
              this.tokenService.storeToCookie(tokenResponse);
              const parsedToken = this.tokenService.parseJWTToken(tokenResponse.refresh);

              return of(parsedToken);
            }),
            switchMap((parsedToken) => [
              invokeFetchingUser({ id: parsedToken.user_id}),
              AuthActions.loginSuccess()
              ]
            ),
            catchError((err: HttpErrorResponse) => {
              return of(AuthActions.loginFailure({ error: err.error.detail }));
            })
          )
        })
      )
    }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly tokenApi: TokenApi,
    private readonly tokenService: TokenService
  ) {}
}
