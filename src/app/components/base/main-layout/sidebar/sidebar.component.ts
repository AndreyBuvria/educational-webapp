import { AuthService } from 'src/app/shared/services/auth.service';
import { UserApiService } from './../../../../shared/services/user-api.service';
import { UserSimple } from './../../../../shared/interfaces/user.interface';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() public user!: UserSimple | null;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  public onLogout() {
    this.auth.onLogout();
  }

}
