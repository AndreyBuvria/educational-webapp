import { StudentModule } from '../../../main/student/student.module';
import { JoinCourseComponent } from './join-course/join-course.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FindCourseComponent } from './find-course/find-course.component';
import { CourseSuggestionComponent } from './find-course/course-suggestion/course-suggestion.component';

@NgModule({
  declarations: [
    JoinCourseComponent,
    FindCourseComponent,
    CourseSuggestionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    StudentModule
  ],
  providers: [
  ]
})
export class ModalsBundleModule { }
