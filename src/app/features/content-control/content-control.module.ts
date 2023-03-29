import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared";
import { FilterBarComponent } from "./components";

@NgModule({
  declarations: [FilterBarComponent],
  imports: [
    SharedModule
  ],
  exports: [FilterBarComponent]
})
export class ContentControlModule {}
