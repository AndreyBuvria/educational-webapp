import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UserActions from '../actions/user.actions';
import { EMPTY, catchError, exhaustMap, map } from "rxjs";
import { UserApi } from "@features/user";

@Injectable()
export class UserEffects {
  fetchUserById$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.invokeFetchingUser),
        exhaustMap((action) =>
          this.userApi.getUser(action.id).pipe(
            map(data => UserActions.setUser({ user: data })),
            catchError(() => EMPTY)
          )
        )
      )
    }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly userApi: UserApi
  ) {}
}
