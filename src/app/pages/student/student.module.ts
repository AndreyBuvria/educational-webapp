import { FeaturesModule } from '@features';
import { StudentRoutingModule } from './student-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { CourseListComponent, CoursePageComponent } from './components';
import { TaskEffects } from '@store/effects';
import { EffectsModule } from '@ngrx/effects';

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
    EffectsModule.forFeature([TaskEffects])
  ],
  exports: [
    RouterModule,
  ],
})
export class StudentModule { }
