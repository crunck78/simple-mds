import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { RouterOutlet } from '@angular/router';

const imports = [
  MaterialModule,
  RouterOutlet
];

@NgModule({
  imports: [...imports],
  exports: [...imports]
})
export class MainContentModule { }
