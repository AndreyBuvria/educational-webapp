import { CourseListState, UserState, TaskState, CourseState, AuthState } from "./states";

export interface AppState extends
  CourseListState,
  CourseState,
  TaskState,
  UserState,
  AuthState {}
