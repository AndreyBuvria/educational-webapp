import { AppRoutesEnum } from './../../../shared/enums/routes.enum';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskInterface, CourseInterface } from './../../../shared/interfaces/course.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseApiService } from 'src/app/shared/services/api/course-api.service';
import { Observable, switchMap, Subscription } from 'rxjs';
import { FilterSortValues } from '../../base/ui/filter-bar/enums/filter-bar.enum';

@Component({
  selector: 'app-course-page',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CoursePageComponent implements OnInit, OnDestroy {
  public taskList!: Observable<TaskInterface[]>;
  public course!: Observable<CourseInterface>;
  public sortTypeValue: FilterSortValues = FilterSortValues.Default;

  private sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseApi: CourseApiService) { }

  ngOnInit(): void {
    this.initTaskList();
    this.initCourse();
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  private initTaskList() {
    this.taskList = this.route.params
      .pipe(
        switchMap((params: Params) => this.courseApi.getTaskListByCourseId(params['id']))
    );
  }
  private initCourse() {
    this.course = this.route.params
      .pipe(
        switchMap((params: Params) => this.courseApi.getCourse(params['id']))
    );
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
