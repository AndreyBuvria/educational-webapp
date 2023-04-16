import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectUser = (state: any) => state.core.user;


