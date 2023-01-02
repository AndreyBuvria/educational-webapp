import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskInterface } from './../../../shared/interfaces/course.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseApiService } from 'src/app/shared/services/course-api.service';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, OnDestroy {

  public taskList: Observable<TaskInterface[]> = this.route.params
    .pipe(
      switchMap((params: Params) => this.courseService.getTaskListByCourseId(params['id']))
  );
  public prefix: string = 'task-';

  constructor(private route: ActivatedRoute, private courseService: CourseApiService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
