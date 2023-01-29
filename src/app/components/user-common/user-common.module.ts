import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './profile/about/about.component';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../base/main-layout/main-layout.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AboutComponent,
    ProfileComponent,
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
            redirectTo: 'profile/:name',
            pathMatch: 'full',
          },
          {
            path: 'profile/:name',
            component: ProfileComponent,
          },
          { path: '**', redirectTo: '/' }
        ]
      }
    ])
  ]
})
export class UserCommonModule { }
