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

  constructor(
    private taskApi: TaskApi,
    private courseService: CourseService,
  ) { }

  private initTasks(): Observable<TaskItem[]> {
    return this.taskApi.getList();
  }
  public initTasksRelatedToCourse(courseId: number): Observable<TaskItem[] | null> {
    return this.taskApi.getListByCourseId(courseId);
  }

  public getTask(taskID: TaskItem['id']): Observable<TaskItem> {
    return this.taskApi.getOne(taskID);
  }
}
