import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'student',
    loadChildren: () =>
      import('./components/student/student.module').then((mod) => mod.StudentModule),
  },
  {
    path: 'teacher',
    loadChildren: () =>
      import('./components/teacher/teacher.module').then((mod) => mod.TeacherModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
