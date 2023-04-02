import { courseReducer } from '@store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@shared";
import { CourseItemComponent, FindCourseComponent, JoinCourseComponent } from "./components";
import { CourseSuggestionComponent } from "./components/find-course";
import { CoursesEffects } from '@store/effects/course.effects';
import { StoreModule } from '@ngrx/store';
import { FeatureKeysEnum } from '@store/enums';

@NgModule({
  declarations: [
    CourseItemComponent,
    JoinCourseComponent,
    FindCourseComponent,
    CourseSuggestionComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature(FeatureKeysEnum.Course, courseReducer),
    EffectsModule.forFeature([CoursesEffects])
  ],
  exports: [
    CourseItemComponent,
    JoinCourseComponent,
    FindCourseComponent,
    CourseSuggestionComponent,
  ]
})
export class CourseModule {}
