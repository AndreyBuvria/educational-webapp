import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hide: boolean = true;
  public form!: FormGroup;
  public sumbitted: boolean = false;
  public validatorsLength: { firstname: number } = {
    firstname: 20,
  };

  @ViewChild('commentNgForm') public commentNgForm!: NgForm;

  constructor(private router: Router, private route: ActivatedRoute) { }

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

    console.log(data);

    this.commentNgForm.resetForm();

    this.sumbitted = false;
  }

}
