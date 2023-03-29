import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CourseItem } from '@features/course';

@Component({
  selector: 'app-course-suggestion',
  templateUrl: './course-suggestion.component.html',
  styleUrls: ['./course-suggestion.component.scss']
})
export class CourseSuggestionComponent implements OnInit {
  @Input()
  public course!: CourseItem;
  @Output()
  public onJoinCourseEmitter: EventEmitter<CourseItem['key']> = new EventEmitter<CourseItem['key']>();

  public isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onJoinCourse() {
    this.onJoinCourseEmitter.emit(this.course.key);
  }
}
