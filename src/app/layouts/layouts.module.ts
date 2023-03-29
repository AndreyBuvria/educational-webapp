import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared";
import { SidebarComponent } from "./components";
import { MainLayoutComponent } from "./main";

@NgModule({
  declarations: [MainLayoutComponent, SidebarComponent],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [MainLayoutComponent, SidebarComponent]
})
export class LayoutModule {}
