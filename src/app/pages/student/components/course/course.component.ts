import { CourseApi, CourseItem, CourseService } from '@features/course';
import { AppRoutesEnum } from '@core/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { TaskItem, TaskService } from '@features/task';
import { FilterSortValues } from '@features/content-controls';
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { invokeFetchingCourse } from '@store/actions';
import { selectCourseItem } from '@store/selectors';

@Component({
  selector: 'app-course-page',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CoursePageComponent implements OnInit, OnDestroy {
  public taskList!: Observable<TaskItem[] | null>;
  public course: Observable<CourseItem> = this.store.select(selectCourseItem);
  public sortTypeValue: FilterSortValues = FilterSortValues.Default;

  private sub!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private courseApi: CourseApi,
    private taskService: TaskService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.initTaskList();
    this.initCourse();
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  private initTaskList() {
    this.taskList = this.taskService.tasksRelatedToCourse$;
  }
  private initCourse() {
    const paramId = this.route.snapshot.params['id'];

    this.store.dispatch(invokeFetchingCourse({ id: paramId }));
  }

  public onLeaveCourse(courseID: CourseItem['id']) {
    this.sub = this.courseApi.removeUserFromCourse(courseID)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/', AppRoutesEnum.Student, 'course/']);
        },
        error: (error) => console.log(error)
      }
    );
  }

  public onApplySortType(e: FilterSortValues) {
    this.sortTypeValue = e;
  }

}
