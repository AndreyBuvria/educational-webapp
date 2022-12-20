import { UserCommonGuard } from './shared/guards/user-common.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/base/welcome/welcome.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoggedInGuard } from './shared/guards/logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'auth',
    canLoad: [LoggedInGuard],
    loadChildren: () =>
      import('./components/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'user',
    canLoad: [UserCommonGuard],
    loadChildren: () =>
      import('./components/user-common/user-common.module').then((mod) => mod.UserCommonModule),
  },
  {
    path: 'student',
    canLoad: [AuthGuard],
    data: {
      role: 'STUDENT',
    },
    loadChildren: () =>
      import('./components/student/student.module').then((mod) => mod.StudentModule),
  },
  {
    path: 'teacher',
    data: {
      role: 'TEACHER',
    },
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./components/teacher/teacher.module').then((mod) => mod.TeacherModule),
  },
  { path: '**', redirectTo: '/welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LoggedInGuard, UserCommonGuard]
})
export class AppRoutingModule { }
