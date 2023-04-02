import { TaskItem } from "@features/task";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeatureKeysEnum } from "@store/enums";
import { TaskState } from "@store/states";

export const selectTaskFeature = createFeatureSelector<TaskState>(FeatureKeysEnum.Task);

export const selectTaskListToCourse = createSelector(
  selectTaskFeature,
  (state: TaskState): TaskItem[] => state.taskList
);
