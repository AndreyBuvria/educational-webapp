import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseInterface, TaskInterface } from '../../interfaces/course.interface';
import { Observable } from 'rxjs';
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
  public getCourseListForUser(): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>(`${environment.API_URL}course/usr_joined/`);
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

  /* Task */
  public getTaskListByCourseId(courseID: CourseInterface['id']): Observable<TaskInterface[]> {
    return this.http.get<TaskInterface[]>(`${environment.API_URL}course/${courseID}/tasks/`)
  }
  public getTaskList(): Observable<TaskInterface[]> {
    return this.http.get<TaskInterface[]>(`${environment.API_URL}task/`);
  }
  public getTask(taskID: TaskInterface['id']): Observable<TaskInterface> {
    return this.http.get<TaskInterface>(`${environment.API_URL}task/${taskID}/`);
  }
  public createTask(task: TaskInterface): Observable<any> {
    return this.http.post(`${environment.API_URL}task/`, task);
  }
  public updateTask(task: TaskInterface): Observable<any> {
    return this.http.patch(`${environment.API_URL}task/${task.id}/`, task);
  }
  public deleteTask(taskID: TaskInterface['id']): Observable<any> {
    return this.http.delete(`${environment.API_URL}task/${taskID}/`);
  }
  /* */
}
