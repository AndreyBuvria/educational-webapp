import { CourseApiService } from 'src/app/main/apis/course-api.service';
import { TaskService } from '../../services/task.service';
import { CourseService } from '../../services/course.service';
import { AppRoutesEnum } from '../../../core/enums/routes.enum';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskInterface, CourseInterface } from '../../interfaces/course.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, switchMap, Subscription } from 'rxjs';
import { FilterSortValues } from '../../../shared/components/ui/filter-bar/enums/filter-bar.enum';

@Component({
  selector: 'app-course-page',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CoursePageComponent implements OnInit, OnDestroy {
  public taskList!: Observable<TaskInterface[] | null>;
  public course!: Observable<CourseInterface | null>;
  public sortTypeValue: FilterSortValues = FilterSortValues.Default;

  private sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private courseApi: CourseApiService,
    private taskService: TaskService
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
    this.course = this.courseService.course$;
  }

  public onLeaveCourse(courseID: CourseInterface['id']) {
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
