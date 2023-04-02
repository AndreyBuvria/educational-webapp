import { createAction, props } from "@ngrx/store";
import { CourseItemState, CourseListState } from "../states";

export const fetchCourseList = createAction(
  '[Courses API] Get course list',
  props<CourseListState>()
);

export const invokeFetchingCourse = createAction(
  '[Courses API] Invoke fetching course one',
  props<{ id: number }>()
);

export const getCourseOne = createAction(
  '[Courses API] Get course one',
  props<CourseItemState>()
);
