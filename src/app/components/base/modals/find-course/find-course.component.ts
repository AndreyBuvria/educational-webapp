import { AppRoutesEnum } from 'src/app/shared/enums/routes.enum';
import { Router } from '@angular/router';
import { JoinCourseStatusResponse } from './../join-course/enums/join-response.enum';
import { Observable, Subject, takeUntil, debounceTime, map, switchMap } from 'rxjs';
import { CourseInterface } from 'src/app/shared/interfaces/course.interface';
import { CourseApiService } from 'src/app/shared/services/api/course-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-find-course',
  templateUrl: './find-course.component.html',
  styleUrls: ['./find-course.component.scss']
})
export class FindCourseComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public isLoading: boolean = false;
  public courseList$!: Observable<CourseInterface[]>;

  private status!: JoinCourseStatusResponse;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private modalRef: MatDialogRef<FindCourseComponent>,
    private courseApi: CourseApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initCourseList();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private initForm() {
    this.form = new FormGroup({
      searchField: new FormControl('', Validators.required)
    });
  }
  private initCourseList() {
    this.courseList$ = this.searchField.valueChanges
      .pipe(
        switchMap((searchFieldValue: string) => {
          return this.courseApi.getCourseListWithoutPagination()
            .pipe(
              map((courseList: CourseInterface[]) => {
                if (searchFieldValue.length === 0) return [];

                const value = searchFieldValue.toLowerCase();
                return courseList.filter((course: CourseInterface) => {
                  return course.name.toLowerCase().startsWith(value) && course.access == 'Public';
                });
              })
            )
        })
    );
  }

  public onSubmit() {
    if (this.form.invalid) return;
  }

  public onJoinCourse(key: CourseInterface['key']) {
    this.courseApi.addUserToCourse(key)
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(1000),
      )
      .subscribe({
        next: (response) => {
          this.status = response.status;
          if (response.status == JoinCourseStatusResponse.Ok) {
            this.modalRef.close();
            this.router.navigate(['/', AppRoutesEnum.Student, 'course', response.response.course.id]);
          }
        },
        error: (error) => {
          this.status = JoinCourseStatusResponse.FAILED;
          console.log(error);
        }
      })
  }

  public get isUserJoinedToCourse() {
    return this.status === JoinCourseStatusResponse.Existed;
  }
  public get searchField() {
    return this.form.get('searchField') as FormControl;
  }
  public get errorMessage() {
    if (this.searchField.errors?.['required']) return 'The field cannot be empty';
    return '';
  }

}
