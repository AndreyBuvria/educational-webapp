import { User, UserSimple } from './../../../../shared/interfaces/user.interface';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() public user!: UserSimple | null;

  constructor() { }

  ngOnInit(): void {
  }

  public onLogout() {
   // console.log(this.user);
  }

}
