import { ActivatedRoute, Params } from '@angular/router';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseInterface, TaskInterface } from '../interfaces/course.interface';
import { Observable, switchMap } from 'rxjs';
import { JoinCourseResponse } from 'src/app/components/base/modals/join-course/interfaces/join-course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {

  constructor(private http: HttpClient) { }

  /* Course */
  public getCourseList(): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>(`${environment.API_URL}course/`);
  }
  public getCourse(courseId: number): Observable<CourseInterface>  {
    return this.http.get<CourseInterface>(`${environment.API_URL}course/${courseId}/`);
  }
  public createCourse(course: CourseInterface): Observable<any> {
    return this.http.post(`${environment.API_URL}course/`, course);
  }
  public updateCourse(course: CourseInterface): Observable<any> {
    return this.http.patch(`${environment.API_URL}course/${course.id}/`, course);
  }
  public deleteCourse(courseID: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}course/${courseID}/`);
  }
  public addUserToCourse(courseKey: string): Observable<JoinCourseResponse<any>> {
    return this.http.patch<JoinCourseResponse<any>>(`${environment.API_URL}course/add_user/`, { key: courseKey });
  }

  /* Task */
  public getTaskListByCourseId(courseID: number): Observable<TaskInterface[]> {
    return this.http.get<TaskInterface[]>(`${environment.API_URL}course/${courseID}/tasks/`)
  }
  public getTaskList(): Observable<TaskInterface[]> {
    return this.http.get<TaskInterface[]>(`${environment.API_URL}task/`);
  }
  public getTask(taskID: number): Observable<TaskInterface> {
    return this.http.get<TaskInterface>(`${environment.API_URL}task/${taskID}/`);
  }
  public createTask(task: TaskInterface): Observable<any> {
    return this.http.post(`${environment.API_URL}task/`, task);
  }
  public updateTask(task: TaskInterface): Observable<any> {
    return this.http.patch(`${environment.API_URL}task/${task.id}/`, task);
  }
  public deleteTask(taskID: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}task/${taskID}/`);
  }
  /* */
}
