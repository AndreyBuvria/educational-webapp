import { CourseListState, UserState, AuthDataState, CourseState } from "./states";

export interface AppState extends
  UserState,
  CourseListState,
  CourseState,
  AuthDataState {}
