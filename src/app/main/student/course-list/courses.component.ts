import { CoursePaginationService } from '../../services/course-pagination.service';
import { PaginationData } from '../../interfaces/pagination-response.interface';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { CourseInterface } from '../../interfaces/course.interface';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public courseList$: Observable<CourseInterface[]> = this.courseService.userCourses$;
  public paginationData$: Observable<PaginationData> = this.courseService.userCoursesPaginationData$;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private coursePagination: CoursePaginationService) { }

  ngOnInit(): void {
  }

  public getSuggestionsOfItemsPerPage(count: number) {
    const size: number = 2 || 2;

    let itemSections: number[] = [];

    for (let i = 1; i <= count / size; i++) {
      itemSections.push(i * size);
    }

    return itemSections;
  }

  public goToCourse(courseId: number) {
    this.router.navigate(['/','student', 'course', courseId]);
  }

  public onPageChange(e: PageEvent) {
    this.coursePagination.setPageEventUserCourses(e);
  }

}
