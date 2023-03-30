import { AuthApi } from '../../../../shared/apis';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { checkPasswordMatch } from '@shared/validators';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public hide: boolean = true;
  public form!: FormGroup;
  public sumbitted: boolean = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public validatorsLength: { firstname: number, lastname: number, username: number, password: number} = {
    firstname: 36,
    lastname: 40,
    username: 20,
    password: 8,
  };

  @ViewChild('commentNgForm') public commentNgForm!: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authApiService: AuthApi,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.maxLength(this.validatorsLength.firstname)]),
      lastname: new FormControl('', [Validators.required, Validators.maxLength(this.validatorsLength.lastname)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(this.validatorsLength.username)]),
      role: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      about: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.validatorsLength.password)]),
      re_password: new FormControl('', [Validators.required, Validators.minLength(this.validatorsLength.password)]),
    });

    this.form.get('re_password')?.addValidators([checkPasswordMatch(this.form.controls['password'])]);
  }

  public goLogin() {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

  public onSubmit() {
    if (this.form.invalid) return;

    this.sumbitted = true;

    const data = {
      first_name: this.form.get('firstname')!.value,
      last_name: this.form.get('lastname')!.value,
      username: this.form.get('username')!.value,
      role: this.form.get('role')!.value,
      email: this.form.get('email')!.value,
      about: this.form.get('about')!.value,
      password: this.form.get('password')!.value,
    };

    console.log(data);

    this.authApiService.signup(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.commentNgForm.resetForm();
          console.log(response);
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: (err) => {
          console.log(err);
          if (err.status) {
            const errorKeys = Object.keys(err.error);
            for (const key of errorKeys) {
              this.form.get(key)?.setErrors({'incorrect': true})
            }

            const snackBarRef = this.snackBar.open('Check the correctness of the entered data', 'Close', {
              duration: 5000,
              horizontalPosition: 'end'
            });
          } else {
            const snackBarRef = this.snackBar.open('Something went wrong', 'Close', {
              duration: 5000,
              horizontalPosition: 'end'
            });
          }
        }
      });

    this.sumbitted = false;
  }

  /* Errors */
  public getEmailError() {
    if (this.form.get('email')?.hasError('required')) return 'Incorrect data';

    return this.form.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  public getPasswordError() {
    if (this.form.get('re_password')?.hasError('required')) return 'Incorrect data';

    return this.form.get('re_password')?.hasError('compare') ? 'Password does not match' : '';
  }

}
