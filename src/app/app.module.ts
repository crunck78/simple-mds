import { NgModule } from "@angular/core";
import { TopBarComponent } from "./top-bar/components/top-bar.component";
import { MainContentComponent } from "./main-content/components/main-content.component";

const imports = [
  TopBarComponent,
  MainContentComponent
];

@NgModule({
  imports: [...imports],
  exports: [...imports]
})
export class AppModule { }
