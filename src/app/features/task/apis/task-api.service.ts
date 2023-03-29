import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskItem } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  constructor(private http: HttpClient) { }

  /* Task */
  public getTaskListByCourseId(courseID: number): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${environment.API_URL}task/${courseID}/course/`)
  }
  public getTaskList(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${environment.API_URL}task/`);
  }
  public getTask(taskID: TaskItem['id']): Observable<TaskItem> {
    return this.http.get<TaskItem>(`${environment.API_URL}task/${taskID}/`);
  }
  public createTask(task: TaskItem): Observable<any> {
    return this.http.post(`${environment.API_URL}task/`, task);
  }
  public updateTask(task: TaskItem): Observable<any> {
    return this.http.patch(`${environment.API_URL}task/${task.id}/`, task);
  }
  public deleteTask(taskID: TaskItem['id']): Observable<any> {
    return this.http.delete(`${environment.API_URL}task/${taskID}/`);
  }
  /* */
}
