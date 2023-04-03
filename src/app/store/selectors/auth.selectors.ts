import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "@store/app.state";
import { FeatureKeysEnum } from "@store/enums";
import { AuthState } from "@store/states";

export const selectAuth = createFeatureSelector<AuthState>(FeatureKeysEnum.Auth);

export const selectLogin = createSelector(
  selectAuth,
  state => state.login
);

export const selectSignup = createSelector(
  selectAuth,
  state => state.signup
);
