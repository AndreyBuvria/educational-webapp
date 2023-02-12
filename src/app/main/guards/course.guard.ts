import { CourseService } from '../services/course.service';
import { AppRoutesEnum } from 'src/app/core/enums/routes.enum';
import { CourseApiService } from '../apis/course-api.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseGuard implements CanActivate {

  constructor(
    private courseApi: CourseApiService,
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
          this.courseService.setCurrentCourseID(courseID);
          if (!res) this.router.navigate(['/', AppRoutesEnum.Student, 'course']);
        }),
      )
  }

}
