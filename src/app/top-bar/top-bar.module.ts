import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { SearchWorkspaceComponent } from '../shared/components/search-workspace/search-workspace/search-workspace.component';

const imports = [
  MaterialModule, SearchWorkspaceComponent
]

@NgModule({
  imports: [...imports],
  exports: [...imports]
})
export class TopBarModule { }
