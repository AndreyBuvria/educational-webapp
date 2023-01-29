import { CourseInterface } from 'src/app/shared/interfaces/course.interface';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-suggestion',
  templateUrl: './course-suggestion.component.html',
  styleUrls: ['./course-suggestion.component.scss']
})
export class CourseSuggestionComponent implements OnInit {
  @Input()
  public course!: CourseInterface;
  @Output()
  public onJoinCourseEmitter: EventEmitter<CourseInterface['key']> = new EventEmitter<CourseInterface['key']>();

  public isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onJoinCourse() {
    this.onJoinCourseEmitter.emit(this.course.key);
  }
}
