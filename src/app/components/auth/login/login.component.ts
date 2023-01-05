import { AuthApiService } from './../../../shared/services/auth-api.service';
import { UserApiService } from '../../../shared/services/user-api.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenJWT, User } from '../../../shared/interfaces/user.interface';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

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
    private authService: AuthService,
    private authApiService: AuthApiService,
    private userService: UserApiService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(this.validatorsLength.firstname)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public goSignup() {
    this.router.navigate(['../signup'], { relativeTo: this.route });
  }

  public onSubmit() {
    if (this.form.invalid) return;

    this.sumbitted = true;

    const data = {
      username: this.form.get('username')!.value,
      password: this.form.get('password')!.value
    };

    this.authApiService.obtainToken(data)
      .pipe(takeUntil(this.destroy$))
      .pipe(switchMap((token: TokenJWT) => {
        this.authService.setTokenCookie(token);
        const parsedToken = this.authService.parseJWTToken(token.refresh);
        return this.userService.getUser(parsedToken.user_id);
      }))
      .subscribe({
        next: (user: User) => {
          this.userService.storeUser(user);
          this.router.navigate(['/', 'student']);
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
