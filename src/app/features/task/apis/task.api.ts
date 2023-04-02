import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskItem } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaskApi {

  constructor(private http: HttpClient) { }

  /* Task */
  public getListByCourseId(courseID: number): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${environment.API_URL}task/${courseID}/course/`)
  }
  public getList(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${environment.API_URL}task/`);
  }
  public getOne(taskID: TaskItem['id']): Observable<TaskItem> {
    return this.http.get<TaskItem>(`${environment.API_URL}task/${taskID}/`);
  }
  public create(task: TaskItem): Observable<any> {
    return this.http.post(`${environment.API_URL}task/`, task);
  }
  public update(task: TaskItem): Observable<any> {
    return this.http.patch(`${environment.API_URL}task/${task.id}/`, task);
  }
  public delete(taskID: TaskItem['id']): Observable<any> {
    return this.http.delete(`${environment.API_URL}task/${taskID}/`);
  }
  /* */
}
