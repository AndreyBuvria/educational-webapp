import { CourseInterface } from 'src/app/shared/interfaces/course.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @Input()
  public course!: CourseInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
