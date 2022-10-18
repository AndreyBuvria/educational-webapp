import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public hide: boolean = true;
  public form!: FormGroup;

  public validatorsLength: { firstname: number, username: number,} = {
    firstname: 36,
    username: 20
  };

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.maxLength(this.validatorsLength.firstname)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(this.validatorsLength.username)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      about: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      re_password: new FormControl('', [Validators.required]),
    });
  }

  public goLogin() {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

  public onSubmit() {
    if (this.form.invalid) return;

    const data = {
      firstname: this.form.get('firstname')!.value,
      username: this.form.get('username')!.value,
      email: this.form.get('email')!.value,
      about: this.form.get('about')!.value,
      password: this.form.get('password')!.value,
    };

    console.log(data);

    this.form.reset();
  }

  /* Errors */
  public getEmailError() {
    if (this.form.get('email')?.hasError('required')) return 'Field must be filled';

    return this.form.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  public getPasswordError() {
    if (this.form.get('re_password')?.hasError('required')) return 'Field must be filled';

    return this.form.get('password')?.value != this.form.get('re_password')?.value ? 'Password does not match' : '';
  }

}
