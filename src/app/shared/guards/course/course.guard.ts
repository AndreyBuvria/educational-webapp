import { AppRoutesEnum } from 'src/app/shared/enums/routes.enum';
import { CourseApiService } from '../../services/api/course-api.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseGuard implements CanActivate {

  constructor(
    private courseApi: CourseApiService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const courseID = route.params['id'];
    return this.courseApi.checkUserMembership(courseID)
      .pipe(
        catchError(() => of(false)),
        tap((res: any) => {
          if (!res) this.router.navigate(['/', AppRoutesEnum.Student, 'course']);
        }),
      )
  }

}
