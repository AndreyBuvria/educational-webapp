import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JoinCourseComponent, FindCourseComponent } from '@features/course';
import { AppRoutesEnum } from '@core/enums';
import { User } from '@features/user';
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { selectUser } from '@store/selectors';
import { Observable, tap } from 'rxjs';
import { UserRolesEnum } from '@features/user/enums';
import { AuthService } from '@features/auth/services/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  public user$: Observable<User> = this.store.select(selectUser);
  public userRole: typeof UserRolesEnum = UserRolesEnum;

  public get studentRoute() {
    return `/${AppRoutesEnum.Student}`;
  }
  public get teacherRoute() {
    return `/${AppRoutesEnum.Teacher}`;
  }
  public get authRoute() {
    return `/${AppRoutesEnum.Auth}`;
  }
  public get userRouter() {
    return `/${AppRoutesEnum.User}`;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly modal: MatDialog,
    private readonly store: Store<AppState>
    ) { }

  ngOnInit(): void {}
  ngOnDestroy(): void {
  }

  public onOpenFindCourseModal() {
    this.modal.open(FindCourseComponent, {
      width: '650px',
    });
  }

  public onOpenJoinCourseModal() {
    this.modal.open(JoinCourseComponent, {
      width: '400px',
    });
  }

  public onLogout() {
    this.authService.logout();
    this.router.navigateByUrl(this.authRoute + '/login');
  }
}
