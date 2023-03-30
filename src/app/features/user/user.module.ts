import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AboutComponent } from './components/about';

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    AboutComponent
  ]
})
export class UserModule { }
