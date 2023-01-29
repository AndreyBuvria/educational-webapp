import { ModalsBundleModule } from './components/base/modals/modals.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './components/base/main-layout/main-layout.component';

import { MaterialModule } from './shared/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { WelcomeComponent } from './components/base/welcome/welcome.component';
import { SidebarComponent } from "./components/base/main-layout/sidebar/sidebar.component";

@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        WelcomeComponent,
        SidebarComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ModalsBundleModule
    ],
    providers: [CookieService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
      }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
