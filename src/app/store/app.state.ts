import { CourseState, UserState } from "./states";

export interface AppState extends UserState, CourseState {}
