import { MainLayoutComponent } from '../../layouts/main/main.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseGuard } from "src/app/pages/student/guards/course.guard";
import { CoursePageComponent } from "./components/course/course.component";
import { CourseListComponent } from './components/course/course-list/course-list.component';

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
  providers: []
})
export class StudentRoutingModule { }
