import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursePageComponent, CourseListComponent } from "./components";

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
  },
  { path: '**', redirectTo: 'course' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StudentRoutingModule { }
