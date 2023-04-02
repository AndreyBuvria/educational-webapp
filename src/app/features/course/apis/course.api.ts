import { PageEvent } from '@angular/material/paginator';
import { CoursePaginationService } from '../services';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { JoinCourseResponse } from '@features/course';
import { BasePaginationResponse } from '@shared/interfaces';
import { CourseItem } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CourseApi {
  private defaultPageSize: number = 2;

  constructor(
    private http: HttpClient,
    private coursePagination: CoursePaginationService
  ) { }

  public getCourseListWithPagination(): Observable<BasePaginationResponse<CourseItem[]>> {
    return this.coursePagination.pageEventUserCourses$
      .pipe(
        switchMap((data: PageEvent | null) => {
          if (!data) return this.http.get<BasePaginationResponse<CourseItem[]>>(`${environment.API_URL}course/?limit=${this.defaultPageSize}&offset=0`);

          let limit = data.pageSize;
          let offset = data.pageIndex;

          return this.http.get<BasePaginationResponse<CourseItem[]>>(`${environment.API_URL}course/?limit=${limit}&offset=${offset}`);
        })
    );
  }

  public getOne(id: number): Observable<CourseItem> {
    return this.http.get<CourseItem>(`${environment.API_URL}course/${id}/`);
  }

  public getList(): Observable<CourseItem[]> {
    return this.http.get<CourseItem[]>(`${environment.API_URL}course/`);
  }

  public getListToUser(): Observable<CourseItem[]> {
    return this.http.get<CourseItem[]>(`${environment.API_URL}course/usr_joined`);
  }

  public getCourseListForUser(): Observable<BasePaginationResponse<CourseItem[]>> {
    return this.coursePagination.pageEventUserCourses$
      .pipe(
        switchMap((data: PageEvent | null) => {
          if (!data) return this.http.get<BasePaginationResponse<CourseItem[]>>(`${environment.API_URL}course/usr_joined/?limit=${this.defaultPageSize}&offset=0`);

          let limit = data.pageSize;
          let offset = data.pageIndex;

          return this.http.get<BasePaginationResponse<CourseItem[]>>(`${environment.API_URL}course/usr_joined/?limit=${limit}&offset=${offset}`);
        })
    );
  }

  public create(course: CourseItem): Observable<any> {
    return this.http.post(`${environment.API_URL}course/`, course);
  }
  public update(course: CourseItem): Observable<any> {
    return this.http.patch(`${environment.API_URL}course/${course.id}/`, course);
  }
  public delete(courseID: CourseItem['id']): Observable<any> {
    return this.http.delete(`${environment.API_URL}course/${courseID}/`);
  }

  public patch(data: Partial<CourseItem>): Observable<CourseItem> {
    return this.http.patch<CourseItem>(`${environment.API_URL}course/`, data);
  }

  public addUserToCourse(courseKey: CourseItem['key']): Observable<JoinCourseResponse<any>> {
    return this.http.patch<JoinCourseResponse<any>>(`${environment.API_URL}course/add_user/`, { key: courseKey });
  }
  public removeUserFromCourse(courseID: CourseItem['id']): Observable<JoinCourseResponse<any>> {
    return this.http.patch<JoinCourseResponse<any>>(`${environment.API_URL}course/${courseID}/remove_user/`, { });
  }
  public checkUserMembership(courseID: CourseItem['id']): Observable<JoinCourseResponse<any>> {
    return this.http.get<JoinCourseResponse<any>>(`${environment.API_URL}course/${courseID}/check_user/`, { });
  }
}
