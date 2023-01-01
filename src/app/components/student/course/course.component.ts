import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskInterface } from './../../../shared/interfaces/course.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseApiService } from 'src/app/shared/services/course-api.service';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, OnDestroy {

  public taskList!: TaskInterface[];
  public form: FormGroup = new FormGroup<any>({});
  public prefix: string = 'task-';

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private courseService: CourseApiService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .pipe(
        switchMap((params: Params) => this.courseService.getTaskListByCourseId(params['id']))
      )
      .subscribe({
        next: (tasks: TaskInterface[]) => {
          this.taskList = tasks;
          for (const task of tasks) {
            const key: string = this.prefix + task.id.toString();
            const control = new FormControl();
            this.form.addControl(key, control);
          }
          console.log(this.form);
        },
        error: (error) => console.log,
      })
  }

  public onSubmit(taskID: TaskInterface['id']) {
    const data = this.form.get(this.prefix+taskID)?.value;
    console.log(data);
  }

  /* Access form */
  public getAccessFormArrayValue(taskID: TaskInterface['id']): FormArray['value'] | null {
    return this.getAccessFormArray(taskID).length > 0 ? this.getAccessFormArray(taskID).value : null;
  }

  private getAccessFormArray(taskID: TaskInterface['id']): FormArray {
    return this.form.get(this.prefix + taskID.toString()) as FormArray;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
