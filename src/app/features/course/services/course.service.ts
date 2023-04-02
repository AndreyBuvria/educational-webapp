import { BasePaginationResponse, PaginationData } from '@shared/interfaces';
import { CourseApi } from '../apis';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, map, of, switchMap } from 'rxjs';
import { CourseItem } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private _currentCourseID$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private _allCoursesPaginationData$: Subject<PaginationData> = new Subject<PaginationData>();
  private _userCoursesPaginationData$: Subject<PaginationData> = new Subject<PaginationData>();

  public currentCourseID$: Observable<number | null> = this._currentCourseID$.asObservable();
  public allCoursesPaginationData$: Observable<PaginationData> = this._allCoursesPaginationData$.asObservable();
  public userCoursesPaginationData$: Observable<PaginationData> = this._userCoursesPaginationData$.asObservable();

  public allCourses$: Observable<CourseItem[]> = this.initAllCourses();
  public userCourses$: Observable<CourseItem[]> = this.initUserCourses();
  public course$: Observable<CourseItem | null> = this.initCourse();

  constructor(
    private courseApi: CourseApi,
  ) {}

  private initAllCourses(): Observable<CourseItem[]> {
    return this.courseApi.getCourseListWithPagination()
      .pipe(
        map((response: BasePaginationResponse<CourseItem[]>) => {
          const paginationData: PaginationData = {
            count: response.count,
            next: response.next,
            previous: response.previous,
            length: response.results.length
          };
          this._allCoursesPaginationData$.next(paginationData);
          return response.results;
        })
    );
  }
  private initUserCourses(): Observable<CourseItem[]> {
    return this.courseApi.getCourseListForUser()
      .pipe(
        map((response: BasePaginationResponse<CourseItem[]>) => {
          const length = response.results.length || 0;
          const paginationData: PaginationData = {
            count: response.count,
            next: response.next,
            previous: response.previous,
            length: length
          };
          this._userCoursesPaginationData$.next(paginationData);
          return response.results;
        })
    );
  }
  private initCourse(): Observable<CourseItem | null> {
    return this.currentCourseID$
      .pipe(
        switchMap((courseID: number | null) => {
          return courseID ? this.courseApi.getOne(courseID) : of(null);
        })
    );
  }

  public setCurrentCourseID(courseID: number) {
    this._currentCourseID$.next(courseID);
  }
}
