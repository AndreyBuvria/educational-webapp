import { UserApiService } from './../../../shared/services/user-api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  public user!: User;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserApiService,) { }

  ngOnInit(): void {
    if (this.userService.user) {
      console.log(this.userService.user);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
