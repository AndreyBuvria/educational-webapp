import { AppRoutesEnum } from '@core/enums';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { CourseApi, CourseService } from '@features/course';

@Injectable({
  providedIn: 'root'
})
export class CourseGuard implements CanActivate {

  constructor(
    private courseApi: CourseApi,
    private router: Router,
    private courseService: CourseService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const courseID = route.params['id'];
    return this.courseApi.checkUserMembership(courseID)
      .pipe(
        catchError(() => of(false)),
        tap((res: any) => {
          //this.courseService.setCurrentCourseID(courseID);
          if (!res) this.router.navigate(['/', AppRoutesEnum.Student, 'course']);
        }),
      )
  }

}
