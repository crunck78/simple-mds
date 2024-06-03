import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, firstValueFrom } from 'rxjs';
import { Channel } from 'src/app/shared/models/channel.class';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { ChannelsService } from 'src/app/shared/services/channels/channels.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { AddMembersComponent } from '../../add-members/add-members/add-members.component';
import firebase from 'firebase/compat/app';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

@Component({
  selector: 'app-channel-title',
  templateUrl: './channel-title.component.html',
  styleUrls: ['./channel-title.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class ChannelTitleComponent implements OnChanges {

  @Input() channel: Channel | undefined;
  @Input() showMenu = true;
  @Output() channelJoin = new EventEmitter<boolean>();
  private channelsService = inject(ChannelsService)
  private auth = inject(AuthenticationService);
  private dialogService = inject(DialogService);
  private navigationService = inject(NavigationService);
  isMemberOfChannel!: Promise<boolean>;

  ngOnChanges(changes: SimpleChanges): void {
    this.isMemberOfChannel = this.channelsService.isMemberOfChannel(this.channel);
  }

  async leaveChannel() {
    if (!this.channel?.customIdName) return;
    const user = await firstValueFrom(this.auth.user$);
    if (!user) return;
    const indexOf = this.channel.members.indexOf(user.uid);
    if (indexOf === -1) return;
    this.channel.members.splice(indexOf, 1);
    this.channelsService.updateChannel(this.channel.customIdName as string, { members: this.channel.members });
  }

  addMembers() {
    if (!this.channel) return;
    const dialogRef = this.dialogService.openDialog(AddMembersComponent) as MatDialogRef<AddMembersComponent, any>;
    dialogRef.componentInstance.channel = this.channel;
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.channel && this.channel.customIdName)
        this.channelsService.addMembersToChannel(this.channel.customIdName, result);
    });
  }

  async joinChannel() {
    if (this.channel?.closed || !this.channel?.customIdName) return;
    const result = await this.channelsService.joinChannel(this.channel.customIdName);
    this.channelJoin.emit(result);
    this.navigationService.navigateToChannel(this.channel);
  }
}
