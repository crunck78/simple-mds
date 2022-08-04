import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AddChannelComponent } from 'src/app/shared/components/addchannel/add-channel/add-channel.component';
import { AddDirectMessageComponent } from 'src/app/shared/components/adddirectmessage/add-direct-message/add-direct-message.component';
import { Channel } from 'src/app/shared/models/channel.class';
import { ChannelsService } from 'src/app/shared/services/channels/channels.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { DirectMessagesService } from 'src/app/shared/services/directmessages/direct-messages.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  channels: Channel[];
  directMessages: {
    customIdName: string;
  }[];

  constructor(
    private channelsService: ChannelsService,
    private directMessagesService: DirectMessagesService,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    //this.channels = this.channelsService.getChannels();
    this.channels = [];
    this.channelsService.getChannels$()
      .subscribe(changes => this.channels = changes);

    this.directMessages = [];
    this.directMessagesService.getDirectMessages$()
      .subscribe(changes => this.directMessages = changes);
  }

  ngOnInit(): void {
  }

  openAddDirectMessageDialog(): void {
    this.dialogService.openDialog(AddDirectMessageComponent)
      .subscribe(result => console.log(result));
  }

  openAddChannelDialog(): void {
    this.dialogService.openDialog(AddChannelComponent)
      .subscribe(newChannel => this.channelsService.addChannel(newChannel));
  }

  createNewChannel(channel: Channel) {
    this.channelsService.addChannel(channel);
  }

  navigateToChannel(channel: Channel) {
    //[routerLink]="[{outlets : {mainSide : ['channel', channel.customIdName]}}]"
    this.router.navigate([{outlets : {mainSide : ['channel', channel.customIdName]}}], {relativeTo : this.route.parent});
  }
}
