import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/base/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'student',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/student/student.module').then((mod) => mod.StudentModule),
  },
  {
    path: 'teacher',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/teacher/teacher.module').then((mod) => mod.TeacherModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard,]
})
export class AppRoutingModule { }
