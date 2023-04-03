import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@shared";
import { TaskItemComponent } from "./components";
import { SortPipe } from "./pipes";
import { StoreModule } from "@ngrx/store";
import { FeatureKeysEnum } from "@store/enums";
import { taskToCourseReducer } from "@store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { TaskEffects } from "@store/effects/task.effects";

@NgModule({
  declarations: [
    TaskItemComponent,
    SortPipe
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    //StoreModule.forFeature(FeatureKeysEnum.Task, taskToCourseReducer),
    //EffectsModule.forFeature([TaskEffects])
  ],
  exports: [
    TaskItemComponent,
    SortPipe
  ]
})
export class TaskModule {}
