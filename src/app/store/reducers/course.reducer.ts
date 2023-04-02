import { createReducer, on } from "@ngrx/store";
import * as CourseActions from '../actions/course.actions';
import { CourseState } from "@store/states";

const initialState: CourseState = {
  courseItem: null,
  courseList: []
};

export const courseReducer = createReducer(
  initialState,
  on(CourseActions.fetchCourseList, (state, { courseList }) => ({
    ...state,
    courseList
  })),
  on(CourseActions.getCourseOne, (state, { courseItem }) => ({
    ...state,
    courseItem
  }))
);
