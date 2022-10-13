import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainLayoutComponent } from '../main-layout/main-layout.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full',
          },
          {
            path: 'login',
            component: LoginComponent,
          },
          {
            path: 'signup',
            component: SignupComponent
          },
          { path: '**', redirectTo: '' }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthModule { }
