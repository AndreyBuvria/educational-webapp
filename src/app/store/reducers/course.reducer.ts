import { CourseItem } from "@features/course";
import { createReducer, on } from "@ngrx/store";
import * as CourseActions from '../actions/course.actions';

const initialState: CourseItem[] = [];

export const courseReducer = createReducer(
  initialState,
  on(CourseActions.getCourseList, (state, { courseList }) => courseList)
)
