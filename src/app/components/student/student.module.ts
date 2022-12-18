import { MaterialModule } from 'src/app/shared/modules/material.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './course-list/courses.component';
import { CourseComponent } from './course/course.component';
import { MainLayoutComponent } from '../base/main-layout/main-layout.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            redirectTo: 'course',
            pathMatch: 'full',
          },
          {
            path: 'course',
            component: CoursesComponent,
          },
          {
            path: 'course/:id',
            component: CourseComponent
          },
          { path: '**', redirectTo: '' }
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [
  ]
})
export class StudentModule { }
