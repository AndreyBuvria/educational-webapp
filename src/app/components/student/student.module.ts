import { TruncatePipe } from './../../shared/pipes/truncate.pipe';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './course-list/courses.component';
import { CourseComponent } from './course/course.component';
import { MainLayoutComponent } from '../base/main-layout/main-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from '../base/ui/file-upload/file-upload.component';
import { TaskComponent } from './course/task/task.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
    FileUploadComponent,
    TruncatePipe,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
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
