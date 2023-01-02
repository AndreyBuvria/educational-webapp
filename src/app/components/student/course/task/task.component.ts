import { FormGroup, FormControl } from '@angular/forms';
import { TaskInterface } from './../../../../shared/interfaces/course.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() public task!: TaskInterface;
  @Input() public taskIndex!: number;

  public form: FormGroup = new FormGroup({
    uploader: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit() {
    console.log(this.form.get('uploader')?.value);
  }

}
