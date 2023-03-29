import { CourseService } from '../../course/services/course.service';
import { Observable, Subject, BehaviorSubject, switchMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaginationData } from '../../../shared/interfaces/pagination-response.interface';
import { TaskApiService } from '../apis/task-api.service';
import { TaskItem } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasksPaginationData$: Subject<PaginationData> = new Subject<PaginationData>();
  private _tasksRelatedToCoursePaginationData$: BehaviorSubject<PaginationData | null> = new BehaviorSubject<PaginationData | null>(null);

  public tasks$: Observable<TaskItem[]> = this.initTasks();
  public tasksRelatedToCourse$: Observable<TaskItem[] | null> = this.initTasksRelatedToCourse();

  constructor(
    private taskApi: TaskApiService,
    private courseService: CourseService,
  ) { }

  private initTasks(): Observable<TaskItem[]> {
    return this.taskApi.getTaskList();
  }
  public initTasksRelatedToCourse(): Observable<TaskItem[] | null> {
    return this.courseService.currentCourseID$
      .pipe(
        switchMap((courseID: number | null) => {
          return courseID ? this.taskApi.getTaskListByCourseId(courseID) : of(null);
        })
    );
  }

  public getTask(taskID: TaskItem['id']): Observable<TaskItem> {
    return this.taskApi.getTask(taskID);
  }
}
