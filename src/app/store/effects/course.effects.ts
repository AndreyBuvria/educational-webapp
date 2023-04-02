import { Injectable } from "@angular/core";
import { CourseApi } from "@features/course";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";
import * as CourseActions from '../actions/course.actions';

@Injectable()
export class CoursesEffects {
  fetchCourseList$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CourseActions.fetchCourseList),
        exhaustMap(() =>
          this.courseApi.getList().pipe(
            map((data) => CourseActions.fetchCourseList({ courseList: data })),
            catchError(() => EMPTY)
          )
        )
      );
    },
  );

  fetchCourse$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CourseActions.invokeFetchingCourse),
        exhaustMap((action) =>
          this.courseApi.getOne(action.id).pipe(
            map((data) => CourseActions.getCourseOne({ courseItem: data })),
            catchError(() => EMPTY)
          )
        )
      );
    },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly courseApi: CourseApi
  ) {}
}
