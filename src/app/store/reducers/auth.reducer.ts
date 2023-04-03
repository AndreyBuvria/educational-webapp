import { createReducer, on } from "@ngrx/store";
import { AuthState } from "@store/states";
import * as AuthActions from '../actions/auth.actions';

const initialState: AuthState = {};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (): Pick<AuthState, 'login'> => ({
    login: {
      success: true
    }
  })),
  on(AuthActions.loginFailure, (_, { error }): Pick<AuthState, 'login'> => ({
    login: {
      success: false,
      error
    }
  })),
);
