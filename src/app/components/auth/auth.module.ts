import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard,],
  exports: [RouterModule]
})
export class AuthModule { }
