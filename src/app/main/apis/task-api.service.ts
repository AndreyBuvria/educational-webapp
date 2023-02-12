import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseInterface, TaskInterface } from '../interfaces/course.interface';
import { BasePaginationResponse } from '../interfaces/pagination-response.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  constructor(private http: HttpClient) { }

  /* Task */
  public getTaskListByCourseId(courseID: CourseInterface['id']): Observable<TaskInterface[]> {
    return this.http.get<TaskInterface[]>(`${environment.API_URL}task/${courseID}/course/`)
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
