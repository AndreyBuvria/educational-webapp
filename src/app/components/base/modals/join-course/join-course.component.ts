import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseApiService } from 'src/app/shared/services/course-api.service';
import { CourseInterface } from 'src/app/shared/interfaces/course.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-join-course',
  templateUrl: './join-course.component.html',
  styleUrls: ['./join-course.component.scss']
})
export class JoinCourseComponent implements OnInit {
  public courseList!: Observable<CourseInterface[]>;
  public form!: FormGroup;
  public validatorsLength: { searchFieldMax: number } = {
    searchFieldMax: 6,
  };
  public submitted: boolean = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private modalRef: MatDialogRef<JoinCourseComponent>,
    private router: Router,
    private courseApiService: CourseApiService
  ) { }

  ngOnInit(): void {
    this.initCourseList();
    this.initForm();
  }

  private initCourseList() {
    this.courseList = this.courseApiService.getCourseList();
  }
  private initForm() {
    this.form = new FormGroup({
      searchField: new FormControl('', [Validators.required, Validators.maxLength(this.validatorsLength.searchFieldMax)])
    })
  }

  public onSubmit() {
    if (this.form.invalid) return;

    this.submitted = true;

    const courseKey = this.form.value['searchField'];
    this.courseApiService.addUserToCourse(courseKey)
      .pipe(takeUntil(this.destroy$))
      .pipe(debounceTime(1000))
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.router.navigate(['/', 'student', 'course', response.response.course.id]);
          this.modalRef.close();
          this.submitted = false;
        },
        error: (error) => console.log(error)
      })

  }

  public get hintLabel() {
    return `${this.form.get('searchField')?.value.length}/${this.validatorsLength.searchFieldMax}`
  }
  public get errorMessage() {
    const control = this.form.get('searchField');
    if (control?.errors?.['required']) return 'The field cannot be empty';
    else if (control?.errors?.['maxlength']?.['requiredLength']) return `Max length is ${control?.errors?.['maxlength']?.['requiredLength']}`;
    else return '';
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
