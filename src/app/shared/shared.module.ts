import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';



@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' }
    },
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    }
  ]
})
export class SharedModule { }
