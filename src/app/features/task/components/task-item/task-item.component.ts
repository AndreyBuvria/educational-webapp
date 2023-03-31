import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { TaskItem } from '../../interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() public task!: TaskItem;
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
