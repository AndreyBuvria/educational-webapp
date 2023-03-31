import { createAction, props } from "@ngrx/store";
import { CourseState } from "../states";

export const getCourseList = createAction(
  '[Courses API] Get course list',
  props<CourseState>()
);


