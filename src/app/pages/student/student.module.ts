import { FeaturesModule } from '@features';
import { StudentRoutingModule } from './student-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "@shared";
import { CourseListComponent, CoursePageComponent } from './components';
import { CourseGuard } from './guards';

@NgModule({
  declarations: [
    CoursePageComponent,
    CourseListComponent
  ],
  imports: [
    ReactiveFormsModule,
    StudentRoutingModule,
    FeaturesModule,
    SharedModule
  ],
  providers: [
    CourseGuard,
  ],
  exports: [
    RouterModule,
  ],
})
export class StudentModule { }
