import { NgModule } from '@angular/core';

import {MatSidenavModule} from '@angular/material/sidenav';

const MATERIALS = [
  MatSidenavModule,
];

@NgModule({
  imports: [MATERIALS],
  exports: [MATERIALS]
})
export class AppRoutingModule { }
