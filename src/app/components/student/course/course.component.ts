import { Router, ActivatedRoute, Params } from '@angular/router';
import { TaskInterface, CourseInterface } from './../../../shared/interfaces/course.interface';
import { Component, OnInit } from '@angular/core';
import { CourseApiService } from 'src/app/shared/services/course-api.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  public tasks: Observable<TaskInterface[]> = this.route.params
    .pipe(
      switchMap((params: Params) => this.courseService.getTaskListByCourseId(params['id']))
    );


  constructor(private route: ActivatedRoute, private courseService: CourseApiService) { }

  ngOnInit(): void {
  }

}
