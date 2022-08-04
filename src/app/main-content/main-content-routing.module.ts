import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelViewComponent } from './components/channel-view/channel-view/channel-view.component';
import { MessageViewComponent } from './components/message-view/message-view/message-view.component';
import { ThreadViewComponent } from './components/thread-view/thread-view/thread-view.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';

const mainContentRoutes: Routes = [
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'channel/:id', component: ChannelViewComponent, outlet: 'mainSide'},
  { path: 'message/:id', component: ThreadViewComponent, outlet: 'rightSide'},
];

@NgModule({
  imports: [RouterModule.forChild(mainContentRoutes)],
  exports: [RouterModule]
})
export class MainContentRoutingModule { }
