import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "@layouts/main";
import { UserPageComponent } from "./user.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile/:name',
    pathMatch: 'full',
  },
  {
    path: 'profile/:name',
    component: UserPageComponent,
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TeacherRoutingModule { }
