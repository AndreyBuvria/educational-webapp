import { MainLayoutComponent } from '../../shared/components/main-layout/main-layout.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseGuard } from "src/app/main/guards/course.guard";
import { CoursesComponent } from "./course-list/courses.component";
import { CoursePageComponent } from "./course/course.component";

const routes: Routes = [
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
        component: CoursePageComponent,
        canActivate: [CourseGuard],
      },
      { path: '**', redirectTo: 'course' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StudentRoutingModule { }
