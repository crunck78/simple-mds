import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { AuthenticateComponent } from '../shared/components/authenticat/authenticate/authenticate.component';
import { ChannelViewComponent } from './components/channel-view/channel-view/channel-view.component';
import { ThreadViewComponent } from './components/thread-view/thread-view/thread-view.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';

const mainContentRoutes: Routes = [
  { path: '',   redirectTo: '/workspace', pathMatch: 'full'},
  { path: 'workspace', component: WorkspaceComponent, canActivate: [LoggedInGuard] },
  { path: 'auth', component: AuthenticateComponent, outlet: 'mainSide'},
  { path: 'channel/:id', component: ChannelViewComponent, outlet: 'mainSide', canActivate: [LoggedInGuard]},
  { path: 'message/:id', component: ThreadViewComponent, outlet: 'rightSide', canActivate: [LoggedInGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(mainContentRoutes)],
  exports: [RouterModule]
})
export class MainContentRoutingModule { }
