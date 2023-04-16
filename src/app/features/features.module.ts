import { NgModule } from "@angular/core";
import { ContentControlsModule } from "./content-controls";
import { CourseModule } from "./course";
import { FileModule } from "./file";
import { TaskModule } from "./task";
import { UserModule } from "./user";

@NgModule({
  exports: [
    TaskModule,
    CourseModule,
    FileModule,
    ContentControlsModule,
    UserModule,
  ]
})
export class FeaturesModule {}
