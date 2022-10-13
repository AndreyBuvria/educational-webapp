import { UserType } from './../../../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public whoUser: UserType = 'STUDENT';

  constructor() { }

  ngOnInit(): void {
  }

  public onLogout() {

  }

}
