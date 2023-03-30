import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutesEnum } from './core/enums';
import { MainLayoutComponent } from '@layouts/main';
import { AuthGuard, LoggedInGuard, UserGuard } from '@shared/guards';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: AppRoutesEnum.Auth,
        canLoad: [LoggedInGuard],
        loadChildren: () =>
          import('./pages/auth/auth.module').then((mod) => mod.AuthModule),
      },
      {
        path: AppRoutesEnum.User,
        canLoad: [UserGuard],
        loadChildren: () =>
          import('./pages/user/user.module').then((mod) => mod.UserPageModule),
      },
      {
        path: AppRoutesEnum.Student,
        canLoad: [AuthGuard],
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
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./pages/teacher/teacher.module').then((mod) => mod.TeacherModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LoggedInGuard, UserGuard]
})
export class AppRoutingModule { }
