import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';

const imports = [
  MaterialModule
]

@NgModule({
  imports: [...imports],
  exports: [...imports]
})
export class TopBarModule { }
