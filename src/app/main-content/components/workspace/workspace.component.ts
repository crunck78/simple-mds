import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddChannelComponent } from 'src/app/shared/components/addchannel/add-channel/add-channel.component';
import { AddDirectMessageComponent } from 'src/app/shared/components/adddirectmessage/add-direct-message/add-direct-message.component';
import { Channel } from 'src/app/shared/models/channel.class';
import { DirectMessage } from 'src/app/shared/models/direct-message.class';
import { ChannelsService } from 'src/app/shared/services/channels/channels.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { DirectMessagesService } from 'src/app/shared/services/directmessages/direct-messages.service';
import { WorkspaceModule } from './workspace.module';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  standalone: true,
  imports: [WorkspaceModule]
})
export class WorkspaceComponent implements OnInit, OnDestroy {

  channels!: Channel[];
  channelsSub!: Subscription;
  directMessages!: DirectMessage[];
  directMessagesSub!: Subscription;
  userSub!: Subscription;
  private channelsService = inject(ChannelsService);
  private directMessagesService = inject(DirectMessagesService);
  private dialogService = inject(DialogService);
  private auth = inject(AuthenticationService);
  public navigationService = inject(NavigationService);

  ngOnInit(): void {

    this.userSub = this.auth.user$.subscribe(user => {
      if (!user) return // wait for user

      this.channels = [];
      this.channelsSub?.unsubscribe();
      this.channelsSub = this.channelsService.getMemberedChannels$()
        .subscribe(changes => this.channels = changes);

      this.directMessages = [];
      this.directMessagesSub?.unsubscribe();
      this.directMessagesSub = this.directMessagesService.getMemberedDirectMessages$()
        .subscribe(changes => this.directMessages = changes as DirectMessage[]);
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.channelsSub?.unsubscribe();
    this.directMessagesSub?.unsubscribe();
  }

  openAddDirectMessageDialog(): void {
    const dialogRef = this.dialogService.openDialog(AddDirectMessageComponent);
    dialogRef.afterClosed().subscribe((newDirectMessage: DirectMessage | undefined) => {
      if (newDirectMessage) this.createNewDirectMessage(newDirectMessage)
    });
  }

  createNewDirectMessage(directMessage: DirectMessage) {
    this.directMessagesService.addDirectMessage(directMessage);
  }

  openAddChannelDialog(): void {
    const dialogRef = this.dialogService.openDialog(AddChannelComponent);
    dialogRef.afterClosed().subscribe((newChannel: Channel | undefined) => {
      if (newChannel) this.createNewChannel(newChannel)
    });
  }

  createNewChannel(channel: Channel) {
    this.channelsService.addChannel(channel);
  }
}
