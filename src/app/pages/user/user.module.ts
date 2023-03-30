import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './user.component';

@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule
  ]
})
export class UserPageModule {}
