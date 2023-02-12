import { CourseService } from './course.service';
import { CourseApiService } from 'src/app/main/apis/course-api.service';
import { TaskInterface } from '../interfaces/course.interface';
import { map, Observable, Subject, BehaviorSubject, switchMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BasePaginationResponse, PaginationData } from '../interfaces/pagination-response.interface';
import { TaskApiService } from '../apis/task-api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasksPaginationData$: Subject<PaginationData> = new Subject<PaginationData>();
  private _tasksRelatedToCoursePaginationData$: BehaviorSubject<PaginationData | null> = new BehaviorSubject<PaginationData | null>(null);

  public tasks$: Observable<TaskInterface[]> = this.initTasks();
  public tasksRelatedToCourse$: Observable<TaskInterface[] | null> = this.initTasksRelatedToCourse();

  constructor(
    private taskApi: TaskApiService,
    private courseService: CourseService,
  ) { }

  private initTasks(): Observable<TaskInterface[]> {
    return this.taskApi.getTaskList();
  }
  public initTasksRelatedToCourse(): Observable<TaskInterface[] | null> {
    return this.courseService.currentCourseID$
      .pipe(
        switchMap((courseID: number | null) => {
          return courseID ? this.taskApi.getTaskListByCourseId(courseID) : of(null);
        })
    );
  }

  public getTask(taskID: TaskInterface['id']): Observable<TaskInterface> {
    return this.taskApi.getTask(taskID);
  }
}
