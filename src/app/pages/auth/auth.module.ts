import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent, SignupComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { StoreModule } from '@ngrx/store';
import { FeatureKeysEnum } from '@store/enums';
import { authReducer } from '@store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@store/effects';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(FeatureKeysEnum.Auth, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [],
  exports: [RouterModule]
})
export class AuthModule { }
