import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
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
