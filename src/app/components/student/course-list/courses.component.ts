import { Router } from '@angular/router';
import { CourseInterface } from './../../../shared/interfaces/course.interface';
import { CourseApiService } from './../../../shared/services/course-api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public courseList: Observable<CourseInterface[]> = this.courseApi.getListCourse();

  constructor(
    private courseApi: CourseApiService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public goToCourse(courseId: number) {
    this.router.navigate(['/','student', 'course', courseId]);
  }

}
