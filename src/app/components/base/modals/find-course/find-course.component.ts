import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-course',
  templateUrl: './find-course.component.html',
  styleUrls: ['./find-course.component.scss']
})
export class FindCourseComponent implements OnInit {
  public isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
