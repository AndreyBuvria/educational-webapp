import { UserService } from '../../../user-common/services/user.service';
import { User } from '../../../user-common/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserSimple, UserType } from 'src/app/user-common/interfaces/user.interface';
import { map, Subject, takeUntil, Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  public userSimple!: UserSimple;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cookie: CookieService,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      const refreshToken = this.cookie.get('token_refresh');
      const userID = this.authService.parseJWTToken(refreshToken).user_id;
      const sharedUserID = this.userService.userIDValue;

      if (!sharedUserID || sharedUserID != userID) this.userService.userID$.next(userID);

      if (this.userService.getUser()) {
        const user$ = this.userService.getUser() as Observable<User>;
        user$
          .pipe(takeUntil(this.destroy$))
          .pipe(map((user: User) => ({
            username: user.username,
            role: user.role.toUpperCase() as UserType
          })))
          .subscribe({
            next: (user: UserSimple) => {
              this.userSimple = user;
            }
          })
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
