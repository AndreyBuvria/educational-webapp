import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard, LoggedInGuard } from './guards';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, SignupComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [RouterModule]
})
export class AuthModule { }
