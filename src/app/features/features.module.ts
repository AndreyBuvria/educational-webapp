import { NgModule } from "@angular/core";
import { ContentControlModule } from "./content-control";
import { CourseModule } from "./course";
import { FileModule } from "./file";
import { TaskModule } from "./task";

@NgModule({
  exports: [
    CourseModule,
    TaskModule,
    FileModule,
    ContentControlModule
  ]
})
export class FeaturesModule {}
