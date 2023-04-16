import { CourseItem } from '@features/course';
import { FeatureKeysEnum } from './../enums';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from '@store/states';

export const selectCourseFeature = createFeatureSelector<CourseState>(FeatureKeysEnum.Course);

export const selectCourseList = createSelector(
  selectCourseFeature,
  (state: CourseState): CourseItem[] => state.courseList
);

export const selectCourseItem = createSelector(
  selectCourseFeature,
  (state: CourseState) => state.courseItem
);

