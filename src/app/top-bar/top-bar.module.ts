import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TopBarComponent } from './components/top-bar.component';

@NgModule({
  declarations: [TopBarComponent],
  imports: [
    SharedModule
  ],
  exports: [
    TopBarComponent
  ]
})
export class TopBarModule { }
