import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/base/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'student',
    canActivate: [AuthGuard, RoleGuard],
    loadChildren: () =>
      import('./components/student/student.module').then((mod) => mod.StudentModule),
  },
  {
    path: 'teacher',
    canActivate: [AuthGuard, RoleGuard],
    loadChildren: () =>
      import('./components/teacher/teacher.module').then((mod) => mod.TeacherModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RoleGuard]
})
export class AppRoutingModule { }
