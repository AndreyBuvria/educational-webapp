import { FormGroup, FormControl } from '@angular/forms';
import { TaskInterface } from '../../../interfaces/course.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() public task!: TaskInterface;
  @Input() public taskIndex!: number;

  public isAvailableToPass!: boolean;

  public form: FormGroup = new FormGroup({
    uploader: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
    this.isAvailableToPass = this.checkExpirationOfTask();
  }

  private checkExpirationOfTask() {
    if (this.task.expires) {
      const currentTime = new Date();
      const taskExpires = new Date(this.task.expires);

      return currentTime < taskExpires;
    }
    return false;
  }

  public onSubmit() {
    if (!this.isAvailableToPass) return;
  }

}
