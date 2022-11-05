import { UserApiService } from './../../../../shared/services/user-api.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenJWT } from './../../../../shared/interfaces/user.interface';
import { AuthService } from './../../../../shared/services/auth.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public hide: boolean = true;
  public form!: FormGroup;
  public sumbitted: boolean = false;
  public validatorsLength: { firstname: number } = {
    firstname: 20,
  };

  private destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('commentNgForm') public commentNgForm!: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private userService: UserApiService,
    private cookie: CookieService,
    private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(this.validatorsLength.firstname)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public goSignup() {
    this.router.navigate(['../signup'], { relativeTo: this.route });
  }

  public setTokenCookie(token: TokenJWT) {
    const cookieExists: boolean = this.cookie.check('token_access') && this.cookie.check('token_refresh');
    const refreshLifetime: Date = new Date(Date.now() + +token.refresh_token_lifetime);
    const access_token_lifetime: Date = new Date(Date.now() + +token.access_token_lifetime);

    console.log(refreshLifetime);

    if (cookieExists) {
      this.cookie.delete('token_access');
      this.cookie.delete('token_refresh');
    }

    this.cookie.set('token_access', token.access, access_token_lifetime);
    this.cookie.set('token_refresh', token.refresh, refreshLifetime);
  }

  public parseUserID(token_access: string) {
    return 1;
  }

  public onSubmit() {
    if (this.form.invalid) return;

    this.sumbitted = true;

    const data = {
      username: this.form.get('username')!.value,
      password: this.form.get('password')!.value
    };

    this.auth.obtainToken(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (token: TokenJWT) => {
          const userID = this.parseUserID(token.access);
          this.setTokenCookie(token);
          this.userService.getUser(userID, this.cookie.get('token_access'))
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (user) => {
                this.userService.user = user;
                this.router.navigate(['/', 'student']);
              },
              error: (error) => console.log(error)
            })
          this.commentNgForm.resetForm();
        },
        error: (err) => {
          console.log(err);
          this.form.get('username')?.setErrors({'incorrect': true});
          this.form.get('password')?.setErrors({'incorrect': true});

          const snackBarRef = this.snackBar.open('Check the correctness of the entered data', 'Close', {
            duration: 5000,
            horizontalPosition: 'end'
          });
        }
      });

    this.sumbitted = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
