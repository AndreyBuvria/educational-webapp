import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared";
import { CourseItemComponent, FindCourseComponent, JoinCourseComponent } from "./components";
import { CourseSuggestionComponent } from "./components/find-course";

@NgModule({
  declarations: [
    CourseItemComponent,
    JoinCourseComponent,
    FindCourseComponent,
    CourseSuggestionComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [CourseItemComponent]
})
export class CourseModule {}
