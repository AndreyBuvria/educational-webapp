import { BasePaginationResponse, PaginationData } from '../interfaces/pagination-response.interface';
import { CourseInterface } from 'src/app/main/interfaces/course.interface';
import { CourseApiService } from '../apis/course-api.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, map, of, switchMap } from 'rxjs';

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

  public allCourses$: Observable<CourseInterface[]> = this.initAllCourses();
  public userCourses$: Observable<CourseInterface[]> = this.initUserCourses();
  public course$: Observable<CourseInterface | null> = this.initCourse();

  constructor(
    private courseApi: CourseApiService,
  ) {}

  private initAllCourses(): Observable<CourseInterface[]> {
    return this.courseApi.getCourseListWithPagination()
      .pipe(
        map((response: BasePaginationResponse<CourseInterface[]>) => {
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
  private initUserCourses(): Observable<CourseInterface[]> {
    return this.courseApi.getCourseListForUser()
      .pipe(
        map((response: BasePaginationResponse<CourseInterface[]>) => {
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
  private initCourse(): Observable<CourseInterface | null> {
    return this.currentCourseID$
      .pipe(
        switchMap((courseID: number | null) => {
          return courseID ? this.courseApi.getCourse(courseID) : of(null);
        })
    );
  }

  public setCurrentCourseID(courseID: number) {
    this._currentCourseID$.next(courseID);
  }
}
