import { PageEvent } from '@angular/material/paginator';
import { CoursePaginationService } from '../services/course-pagination.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseInterface, TaskInterface } from '../interfaces/course.interface';
import { Observable, switchMap } from 'rxjs';
import { JoinCourseResponse } from 'src/app/shared/components/modals/join-course/interfaces/join-course.interface';
import { BasePaginationResponse } from '../interfaces/pagination-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {
  private defaultPageSize: number = 2;

  constructor(
    private http: HttpClient,
    private coursePagination: CoursePaginationService
  ) { }

  /* Course */
  public getCourseListWithoutPagination(): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>(`${environment.API_URL}course/`);
  }
  public getCourseListWithPagination(): Observable<BasePaginationResponse<CourseInterface[]>> {
    return this.coursePagination.pageEventUserCourses$
      .pipe(
        switchMap((data: PageEvent | null) => {
          if (!data) return this.http.get<BasePaginationResponse<CourseInterface[]>>(`${environment.API_URL}course/?limit=${this.defaultPageSize}&offset=0`);

          let limit = data.pageSize;
          let offset = data.pageIndex;

          return this.http.get<BasePaginationResponse<CourseInterface[]>>(`${environment.API_URL}course/?limit=${limit}&offset=${offset}`);
        })
    );
  }

  public getCourseListForUser(): Observable<BasePaginationResponse<CourseInterface[]>> {
    return this.coursePagination.pageEventUserCourses$
      .pipe(
        switchMap((data: PageEvent | null) => {
          if (!data) return this.http.get<BasePaginationResponse<CourseInterface[]>>(`${environment.API_URL}course/usr_joined/?limit=${this.defaultPageSize}&offset=0`);

          let limit = data.pageSize;
          let offset = data.pageIndex;

          return this.http.get<BasePaginationResponse<CourseInterface[]>>(`${environment.API_URL}course/usr_joined/?limit=${limit}&offset=${offset}`);
        })
    );
  }
  public getCourse(courseId: CourseInterface['id']): Observable<CourseInterface>  {
    return this.http.get<CourseInterface>(`${environment.API_URL}course/${courseId}/`);
  }
  public createCourse(course: CourseInterface): Observable<any> {
    return this.http.post(`${environment.API_URL}course/`, course);
  }
  public updateCourse(course: CourseInterface): Observable<any> {
    return this.http.patch(`${environment.API_URL}course/${course.id}/`, course);
  }
  public deleteCourse(courseID: CourseInterface['id']): Observable<any> {
    return this.http.delete(`${environment.API_URL}course/${courseID}/`);
  }
  public addUserToCourse(courseKey: CourseInterface['key']): Observable<JoinCourseResponse<any>> {
    return this.http.patch<JoinCourseResponse<any>>(`${environment.API_URL}course/add_user/`, { key: courseKey });
  }
  public removeUserFromCourse(courseID: CourseInterface['id']): Observable<JoinCourseResponse<any>> {
    return this.http.patch<JoinCourseResponse<any>>(`${environment.API_URL}course/${courseID}/remove_user/`, { });
  }
  public checkUserMembership(courseID: CourseInterface['id']): Observable<JoinCourseResponse<any>> {
    return this.http.get<JoinCourseResponse<any>>(`${environment.API_URL}course/${courseID}/check_user/`, { });
  }
}
