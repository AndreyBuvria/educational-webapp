import { CourseService } from '../../course/services/course.service';
import { Observable, Subject, BehaviorSubject, switchMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaginationData } from '../../../shared/interfaces/pagination-response.interface';
import { TaskApi } from '../apis/task.api';
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
    private taskApi: TaskApi,
    private courseService: CourseService,
  ) { }

  private initTasks(): Observable<TaskItem[]> {
    return this.taskApi.getList();
  }
  public initTasksRelatedToCourse(): Observable<TaskItem[] | null> {
    return this.courseService.currentCourseID$
      .pipe(
        switchMap((courseID: number | null) => {
          return courseID ? this.taskApi.getListByCourseId(courseID) : of(null);
        })
    );
  }

  public getTask(taskID: TaskItem['id']): Observable<TaskItem> {
    return this.taskApi.getOne(taskID);
  }
}
