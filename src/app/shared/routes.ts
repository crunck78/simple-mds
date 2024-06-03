import { Routes } from "@angular/router";
import { WorkspaceComponent } from "../main-content/components/workspace/workspace.component";
import { LoggedInGuard } from "ngx-auth-firebaseui";
import { AuthenticateComponent } from "./components/authenticate/authenticate.component";
import { ChannelViewComponent } from "../main-content/components/channel-view/channel-view/channel-view.component";
import { ThreadViewComponent } from "../main-content/components/thread-view/thread-view/thread-view.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { DirectMessagesViewComponent } from "../main-content/components/direct-messages-view/direct-messages-view/direct-messages-view.component";
import { ProfileComponent } from "./components/profile/profile/profile.component";

export const routes: Routes = [
    { path: '', redirectTo: '/workspace(mainSide:auth//rightSide:profile)', pathMatch: 'full' },
    { path: 'workspace', component: WorkspaceComponent, canActivate: [LoggedInGuard] },
    { path: 'auth', component: AuthenticateComponent, outlet: 'mainSide' },
    { path: 'channel/:id', component: ChannelViewComponent, outlet: 'mainSide', canActivate: [LoggedInGuard] },
    { path: 'direct-messages/:id', component: DirectMessagesViewComponent, outlet: 'mainSide', canActivate: [LoggedInGuard] },
    { path: 'message/:id', component: ThreadViewComponent, outlet: 'rightSide', canActivate: [LoggedInGuard] },
    { path: 'profile', component: ProfileComponent, outlet: 'rightSide'},
    { path: '**', component: PageNotFoundComponent }
  ];