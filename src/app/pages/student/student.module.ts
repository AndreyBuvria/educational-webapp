import { FeaturesModule } from '@features';
import { StudentRoutingModule } from './student-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { CourseListComponent, CoursePageComponent } from './components';

@NgModule({
  declarations: [
    CoursePageComponent,
    CourseListComponent
  ],
  imports: [
    ReactiveFormsModule,
    StudentRoutingModule,
    SharedModule,
    FeaturesModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class StudentModule { }
