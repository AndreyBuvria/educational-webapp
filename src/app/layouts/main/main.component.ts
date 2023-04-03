import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public userSimple = null;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
