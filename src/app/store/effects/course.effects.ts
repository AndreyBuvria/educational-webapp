import { Injectable } from "@angular/core";
import { CourseApi } from "@features/course";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";
import * as CourseActions from '../actions/course.actions';

@Injectable()
export class CoursesEffects {
  fetchCourses$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CourseActions.getCourseList),
        exhaustMap(() =>
          this.courseApi.getCourseListWithoutPagination().pipe(
            map((data) => CourseActions.getCourseList({ courseList: data })),
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
