import { ActivatedRoute, Params } from '@angular/router';
import { TaskInterface, CourseInterface } from './../../../shared/interfaces/course.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseApiService } from 'src/app/shared/services/course-api.service';
import { Observable, switchMap } from 'rxjs';
import { FilterSortValues } from '../../base/ui/filter-bar/enums/filter-bar.enum';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, OnDestroy {
  public taskList!: Observable<TaskInterface[]>;
  public course!: Observable<CourseInterface>;
  public sortTypeValue: FilterSortValues = FilterSortValues.Default;

  constructor(private route: ActivatedRoute, private courseService: CourseApiService) { }

  ngOnInit(): void {
    this.initTaskList();
    this.initCourse();
  }

  ngOnDestroy(): void {
  }

  private initTaskList() {
    this.taskList = this.route.params
      .pipe(
        switchMap((params: Params) => this.courseService.getTaskListByCourseId(params['id']))
    );
  }
  private initCourse() {
    this.course = this.route.params
      .pipe(
        switchMap((params: Params) => this.courseService.getCourse(params['id']))
    );
  }

  public onApplySortType(e: FilterSortValues) {
    this.sortTypeValue = e;
  }

}
