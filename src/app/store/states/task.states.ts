import { TaskItem } from "@features/task";

export interface TaskListState {
  taskList: TaskItem[];
}

export interface TaskListToCourseState {
  taskListToCourse: TaskItem[];
}

export interface TaskState extends TaskListState, TaskListToCourseState {}
