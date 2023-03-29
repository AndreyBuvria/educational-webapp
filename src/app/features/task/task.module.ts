import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared";
import { TaskItemComponent } from "./components";

@NgModule({
  declarations: [TaskItemComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [TaskItemComponent]
})
export class TaskModule {}
