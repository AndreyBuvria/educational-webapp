import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hide: boolean = true;
  public form!: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit() {
    const data = {
      username: this.form.get('username')!.value,
      password: this.form.get('password')!.value
    };

    console.log(data);

    this.form.reset();
  }

}
