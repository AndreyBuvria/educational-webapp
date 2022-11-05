import { User } from './../../../../shared/interfaces/user.interface';
import { UserType } from './../../../../shared/models/user.model';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() public user!: User;

  constructor() { }

  ngOnInit(): void {
  }

  public onLogout() {

  }

}
