import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { importProvidersFrom } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter, withDebugTracing } from "@angular/router";
import { routes } from "./app/shared/routes";
import { MaterialModule } from "./app/shared/modules/material.module";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "./environments/environment.prod";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { NgxAuthFirebaseUIModule } from "ngx-auth-firebaseui";
import { CalendarModule, DateAdapter } from "angular-calendar";
import * as moment from "moment";
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from "@angular/material/core";

function momentAdapterFactory() {
  return adapterFactory(moment);
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' }
    },
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    },
    importProvidersFrom([
      HttpClientModule,
      BrowserAnimationsModule,
      MaterialModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
      NgxAuthFirebaseUIModule.forRoot(
        environment.firebase,
        () => 'simple-mds',
        environment.ngxauthfirebaseui
      ),
      CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    ]),
    provideRouter(routes, withDebugTracing()),
  ]
});