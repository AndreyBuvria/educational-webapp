import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../base/main-layout/main-layout.component';



@NgModule({
  declarations: [
    AboutComponent
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
            redirectTo: 'about/:name',
            pathMatch: 'full',
          },
          {
            path: 'about/:name',
            component: AboutComponent,
          },
          { path: '**', redirectTo: '/' }
        ]
      }
    ])
  ]
})
export class UserCommonModule { }
