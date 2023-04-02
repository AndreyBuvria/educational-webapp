import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as TaskActions from '../actions/task.actions';
import { EMPTY, catchError, exhaustMap, map } from "rxjs";
import { TaskApi } from "@features/task";

@Injectable()
export class TaskEffects {
  fetchTasksRelatedToCourse$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TaskActions.invokeFetchingTasksRelatedToCourse),
        exhaustMap((action) =>
          this.taskApi.getListByCourseId(action.courseId).pipe(
            map(data => TaskActions.getTasksRelatedToCourse({ taskListToCourse: data })),
            catchError(() => EMPTY)
          )
        )
      )
    }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly taskApi: TaskApi
  ) {}
}
