import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { checkPasswordMatch } from 'src/app/shared/validators/password.validator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public hide: boolean = true;
  public form!: FormGroup;
  public sumbitted: boolean = false;

  public validatorsLength: { firstname: number, username: number,} = {
    firstname: 36,
    username: 20
  };

  @ViewChild('commentNgForm') public commentNgForm!: NgForm;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.maxLength(this.validatorsLength.firstname)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(this.validatorsLength.username)]),
      role: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      about: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      re_password: new FormControl('', [Validators.required]),
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
      firstname: this.form.get('firstname')!.value,
      username: this.form.get('username')!.value,
      role: this.form.get('role')!.value,
      email: this.form.get('email')!.value,
      about: this.form.get('about')!.value,
      password: this.form.get('password')!.value,
    };

    console.log(data);

    this.commentNgForm.resetForm();

    this.sumbitted = false;
  }

  /* Errors */
  public getEmailError() {
    if (this.form.get('email')?.hasError('required')) return 'Field must be filled';

    return this.form.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  public getPasswordError() {
    if (this.form.get('re_password')?.hasError('required')) return 'Field must be filled';

    return this.form.get('re_password')?.hasError('compare') ? 'Password does not match' : '';
  }

}
