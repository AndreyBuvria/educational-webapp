import { JoinCourseComponent } from './join-course/join-course.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FindCourseComponent } from './find-course/find-course.component';

@NgModule({
  declarations: [
    JoinCourseComponent,
    FindCourseComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
  ]
})
export class ModalsBundleModule { }
