import { UserLogin } from "@features/user";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
  '[Login] Login user',
  props<UserLogin>()
);

export const loginSuccess = createAction(
  '[Login] Login success'
);

export const loginFailure = createAction(
  '[Login] Login error occurs',
  props<{ error: string }>()
);
