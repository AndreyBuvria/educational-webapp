import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './modules';
import { PipesModule } from './pipes';

@NgModule({
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    PipesModule,
  ]
})
export class SharedModule {}
