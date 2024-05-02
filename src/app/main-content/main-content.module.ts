import { NgModule } from '@angular/core';
import { MainContentComponent } from './components/main-content.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainSideComponent } from './components/main-side/main-side.component';
import { MainContentRoutingModule } from './main-content-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ChannelViewComponent } from './components/channel-view/channel-view/channel-view.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MessageViewComponent } from './components/message-view/message-view/message-view.component';
import { ThreadViewComponent } from './components/thread-view/thread-view/thread-view.component';
import { AnswerViewComponent } from './components/answer-view/answer-view/answer-view.component';



@NgModule({
  declarations: [
    MainContentComponent,
    MainSideComponent,
    WorkspaceComponent,
    ChannelViewComponent,
    MessageViewComponent,
    ThreadViewComponent,
    AnswerViewComponent
  ],
  imports: [
    SharedModule,
    MainContentRoutingModule,
    MatSidenavModule,
    MatExpansionModule,
    MatButtonModule,
    EditorModule,
    MatCardModule
  ],
  exports: [
    MainContentComponent,
    MainSideComponent,
    WorkspaceComponent,
    ChannelViewComponent
  ]
})
export class MainContentModule { }
