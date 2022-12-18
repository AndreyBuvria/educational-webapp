import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseInterface } from '../interfaces/course.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {

  constructor(private http: HttpClient) { }

  public getListCourse(): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>(`${environment.API_URL}course/`);
  }

  public getCourse(courseId: number): Observable<CourseInterface>  {
    return this.http.get<CourseInterface>(`${environment.API_URL}course/${courseId}/`);
  }

  public createCourse(course: CourseInterface) {
    return this.http.post(`${environment.API_URL}course/`, course);
  }

  public updateCourse(course: CourseInterface) {
    return this.http.patch(`${environment.API_URL}course/${course.id}/`, course);
  }

  public deleteCourse(courseId: number) {
    return this.http.delete(`${environment.API_URL}course/${courseId}/`);
  }
}
