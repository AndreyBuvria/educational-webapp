import { CourseListState, UserState, CourseState, AuthState } from "./states";

export interface AppState extends
  CourseListState,
  CourseState,
  UserState,
  AuthState {}
