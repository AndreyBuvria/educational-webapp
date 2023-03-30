import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@shared";
import { TaskItemComponent } from "./components";
import { SortPipe } from "./pipes";

@NgModule({
  declarations: [
    TaskItemComponent,
    SortPipe
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    TaskItemComponent,
    SortPipe
  ]
})
export class TaskModule {}
