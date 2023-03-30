import { SharedModule } from '@shared';
import { NgModule } from "@angular/core";
import { FileUploadComponent } from './components';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    SharedModule
  ],
  exports: [FileUploadComponent]
})
export class FileModule {}
