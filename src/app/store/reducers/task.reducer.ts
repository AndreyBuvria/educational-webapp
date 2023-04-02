import { createReducer, on } from "@ngrx/store";
import * as TaskActions from '../actions/task.actions';
import { TaskState } from "@store/states";

const initialState: TaskState = {
  taskList: [],
  taskListToCourse: []
};

export const taskToCourseReducer = createReducer(
  initialState,
  on(TaskActions.getTasksRelatedToCourse, (state, { taskListToCourse }) => ({
    ...state,
    taskListToCourse
  }))
);

