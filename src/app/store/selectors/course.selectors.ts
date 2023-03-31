import { FeatureKeysEnum } from './../enums';
import { CourseItem } from "@features/course";
import { createFeatureSelector } from "@ngrx/store";

export const selectCourseList = createFeatureSelector<CourseItem[]>(FeatureKeysEnum.CourseList);
