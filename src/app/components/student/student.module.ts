import { StudentRoutingModule } from './student-routing.module';
import { CourseGuard } from './../../shared/guards/course/course.guard';
import { TruncatePipe } from './../../shared/pipes/truncate.pipe';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './course-list/courses.component';
import { CoursePageComponent } from './course/course.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from '../base/ui/file-upload/file-upload.component';
import { TaskComponent } from './course/task/task.component';
import { FilterBarComponent } from '../base/ui/filter-bar/filter-bar.component';
import { SortPipe } from 'src/app/shared/pipes/sort.pipe';
import { CourseComponent } from './course-list/course/course.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursePageComponent,
    FileUploadComponent,
    TruncatePipe,
    SortPipe,
    TaskComponent,
    FilterBarComponent,
    CourseComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ],
  exports: [
    RouterModule,
    CourseComponent,
  ],
  providers: [
    CourseGuard,
  ]
})
export class StudentModule { }
