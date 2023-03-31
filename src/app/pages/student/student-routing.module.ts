import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursePageComponent } from "./components/course/course.component";
import { CourseListComponent } from './components/course';
import { CourseGuard } from "@shared/guards";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'course',
    pathMatch: 'full',
  },
  {
    path: 'course',
    component: CourseListComponent,
  },
  {
    path: 'course/:id',
    component: CoursePageComponent,
    canActivate: [CourseGuard],
  },
  { path: '**', redirectTo: 'course' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CourseGuard]
})
export class StudentRoutingModule { }
