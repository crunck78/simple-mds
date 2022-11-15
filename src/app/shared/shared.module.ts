import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddChannelComponent } from './components/addchannel/add-channel/add-channel.component';
import { AddDirectMessageComponent } from './components/adddirectmessage/add-direct-message/add-direct-message.component';

import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { ChannelTitleComponent } from './components/channel-title/channel-title/channel-title.component';
import { AuthenticateComponent } from './components/authenticat/authenticate/authenticate.component';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { CalendarComponent } from './components/calendar/calendar/calendar.component';
import { DirectMessageTitleComponent } from './components/direct-message-title/direct-message-title.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

@NgModule({
  declarations: [
    PageNotFoundComponent,
    AddChannelComponent,
    AddDirectMessageComponent,
    ChannelTitleComponent,
    AuthenticateComponent,
    CalendarComponent,
    DirectMessageTitleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,

    NgxAuthFirebaseUIModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,

    ChannelTitleComponent,
    CalendarComponent,
    DirectMessageTitleComponent
  ],
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
