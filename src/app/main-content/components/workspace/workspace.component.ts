import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddChannelComponent } from 'src/app/shared/components/addchannel/add-channel/add-channel.component';
import { AddDirectMessageComponent } from 'src/app/shared/components/adddirectmessage/add-direct-message/add-direct-message.component';
import { Channel } from 'src/app/shared/models/channel.class';
import { DirectMessage } from 'src/app/shared/models/direct-message.class';
import { ChannelsService } from 'src/app/shared/services/channels/channels.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { DirectMessagesService } from 'src/app/shared/services/directmessages/direct-messages.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnDestroy {

  channels: Channel[];
  channelsSub!: Subscription;
  directMessages: DirectMessage[];
  directMessagesSub!: Subscription;

  constructor(
    private channelsService: ChannelsService,
    private directMessagesService: DirectMessagesService,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.channels = [];
    this.channelsSub = this.channelsService.getChannels$()
      .subscribe(changes => this.channels = changes);

    this.directMessages = [];
    this.directMessagesSub = this.directMessagesService.getDirectMessages$()
      .subscribe(changes => this.directMessages = changes as DirectMessage[]);
  }

  ngOnDestroy(): void {
    this.channelsSub.unsubscribe();
    this.directMessagesSub.unsubscribe();
  }

  openAddDirectMessageDialog(): void {
    this.dialogService.openDialog(AddDirectMessageComponent)
      .subscribe(newDirectMessage => this.createNewDirectMessage(newDirectMessage));
  }

  createNewDirectMessage(directMessage: DirectMessage) {
    this.directMessagesService.addDirectMessage(directMessage);
  }

  openAddChannelDialog(): void {
    this.dialogService.openDialog(AddChannelComponent)
      .subscribe(newChannel => this.createNewChannel(newChannel));
  }

  createNewChannel(channel: Channel) {
    this.channelsService.addChannel(channel);
  }

  navigateToChannel(channel: Channel) {
    this.router.navigate(
      [{ outlets: { mainSide: ['channel', channel.customIdName] } }],
      { relativeTo: this.route.parent }
    );
  }
}
