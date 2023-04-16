import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AboutComponent } from './components/about';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@store/effects';
import { StoreModule } from '@ngrx/store';
import { FeatureKeysEnum } from '@store/enums';
import { userReducer } from '@store/reducers';

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    AboutComponent
  ]
})
export class UserModule { }
