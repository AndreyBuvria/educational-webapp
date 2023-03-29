import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './modules';
import { SortPipe, TruncatePipe } from './pipes';

@NgModule({
  declarations: [
    SortPipe,
    TruncatePipe
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SortPipe,
    TruncatePipe
  ]
})
export class SharedModule {}
