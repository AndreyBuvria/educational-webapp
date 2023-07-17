import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { UserLogin } from '@features/user';
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { login } from '@store/actions';
import { selectLogin } from '@store/selectors/auth.selectors';
import { AuthOperationDataState } from '@store/states';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public hide: boolean = true;
  public form!: FormGroup;
  public isLoading: boolean = false;
  public validatorsLength: { firstname: number } = {
    firstname: 20,
  };

  private destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('commentNgForm') public commentNgForm!: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(this.validatorsLength.firstname)]),
      password: new FormControl('', [Validators.required]),
    });

    this.initLoginResult();
  }

  public goSignup() {
    this.router.navigate(['../signup'], { relativeTo: this.route });
  }

  public onSubmit() {
    if (this.form.invalid) return;

    const data: UserLogin = {
      username: this.form.get('username')!.value,
      password: this.form.get('password')!.value
    };

    this.store.dispatch(login(data));
  }

  private initLoginResult() {
    this.store.select(selectLogin).pipe(
      takeUntil(this.destroy$),
      filter(Boolean)
    ).subscribe((data: AuthOperationDataState) => {
      if (data.success) {
        this.router.navigate(['/', 'student']);
        return;
      }

      const errorMessage = data.error!;

      console.log(data)

      this.form.get('username')?.setErrors({'incorrect': true});
      this.form.get('password')?.setErrors({'incorrect': true});

      this.snackBar.open(errorMessage, 'Close', {
        duration: 5000,
        horizontalPosition: 'end'
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
