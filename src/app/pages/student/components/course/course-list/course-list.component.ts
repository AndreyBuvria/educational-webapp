import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { PaginationData } from '@shared/interfaces';
import { CourseService, CourseItem, CoursePaginationService } from '@features/course';

@Component({
  selector: 'app-courses',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  public courseList$: Observable<CourseItem[]> = this.courseService.userCourses$;
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
