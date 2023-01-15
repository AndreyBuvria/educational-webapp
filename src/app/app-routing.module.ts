import { UserCommonGuard } from './shared/guards/user-common.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/base/welcome/welcome.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { AppRoutesEnum } from './shared/enums/routes.enum';

const routes: Routes = [
  { path: '', redirectTo: `/${AppRoutesEnum.Welcome}`, pathMatch: 'full' },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: AppRoutesEnum.Auth,
    canLoad: [LoggedInGuard],
    loadChildren: () =>
      import('./components/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: AppRoutesEnum.User,
    canLoad: [UserCommonGuard],
    loadChildren: () =>
      import('./components/user-common/user-common.module').then((mod) => mod.UserCommonModule),
  },
  {
    path: AppRoutesEnum.Student,
    canLoad: [AuthGuard],
    data: {
      role: 'STUDENT',
    },
    loadChildren: () =>
      import('./components/student/student.module').then((mod) => mod.StudentModule),
  },
  {
    path: AppRoutesEnum.Teacher,
    data: {
      role: 'TEACHER',
    },
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./components/teacher/teacher.module').then((mod) => mod.TeacherModule),
  },
  { path: '**', redirectTo: `/${AppRoutesEnum.Welcome}` }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LoggedInGuard, UserCommonGuard]
})
export class AppRoutingModule { }
