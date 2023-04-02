import { createAction, props } from "@ngrx/store";
import { TaskListToCourseState } from "@store/states";

export const invokeFetchingTasksRelatedToCourse = createAction(
  '[Task API] Invoke fetching tasks related to course',
  props<{ courseId: number }>()
);

export const getTasksRelatedToCourse = createAction(
  '[Task API] Get tasks related to course',
  props<TaskListToCourseState>()
);
