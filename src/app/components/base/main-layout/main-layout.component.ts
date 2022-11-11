import { AuthService } from 'src/app/shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UserApiService } from './../../../shared/services/user-api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserSimple, UserType } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  public userSimple!: UserSimple | null

  constructor(private userService: UserApiService, private cookie: CookieService) { }

  ngOnInit(): void {
    this.userSimple = this.userService.getUserLocalData();
  }

  ngOnDestroy(): void {
  }

}
