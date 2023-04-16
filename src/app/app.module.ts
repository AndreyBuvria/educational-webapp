import { LayoutsModule } from './layouts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { APP_CONFIG_PROVIDER, TOKEN_INTERCEPTOR_PROVIDER } from './core';
import { SharedModule } from '@shared';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '@store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@store/effects';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutsModule,
    StoreModule.forRoot(
      { 'core' : userReducer },
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [
    CookieService,
    APP_CONFIG_PROVIDER,
    TOKEN_INTERCEPTOR_PROVIDER,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
