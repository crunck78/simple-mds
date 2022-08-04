import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarModule } from './top-bar/top-bar.module';
import { MainContentModule } from './main-content/main-content.module';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    BrowserAnimationsModule,
    TopBarModule,

    MainContentModule, // order matters
    AppRoutingModule, // order matters

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,

    NgxAuthFirebaseUIModule.forRoot(
      environment.firebase,
      () => 'simple-mds',
      environment.ngxauthfirebaseui
    )

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
