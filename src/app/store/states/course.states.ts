import { CourseItem } from "@features/course";

export interface CourseItemState {
  courseItem: CourseItem | null;
}

export interface CourseListState {
  courseList: CourseItem[];
}

export interface CourseState extends CourseItemState, CourseListState {}
