import { Component, Input, OnInit } from '@angular/core';
import { CourseItem } from '../../interfaces';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input()
  public course!: CourseItem;

  constructor() { }

  ngOnInit(): void {
  }

}
