import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutesEnum } from './core/enums';
import { MainLayoutComponent } from '@layouts/main';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: AppRoutesEnum.Auth,
        loadChildren: () =>
          import('./pages/auth/auth.module').then((mod) => mod.AuthModule),
      },
      {
        path: AppRoutesEnum.User,
        loadChildren: () =>
          import('./pages/user/user.module').then((mod) => mod.UserPageModule),
      },
      {
        path: AppRoutesEnum.Student,
        data: {
          role: 'STUDENT',
        },
        loadChildren: () =>
          import('./pages/student/student.module').then((mod) => mod.StudentModule),
      },
      {
        path: AppRoutesEnum.Teacher,
        data: {
          role: 'TEACHER',
        },
        loadChildren: () =>
          import('./pages/teacher/teacher.module').then((mod) => mod.TeacherModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
