import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Channel } from 'src/app/shared/models/channel.class';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { ChannelsService } from 'src/app/shared/services/channels/channels.service';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { AddMembersComponent } from '../../add-members/add-members/add-members.component';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-channel-title',
  templateUrl: './channel-title.component.html',
  styleUrls: ['./channel-title.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class ChannelTitleComponent {
  @Input() channel: Channel | undefined;
  private channelsService = inject(ChannelsService)
  private auth = inject(AuthenticationService);
  private dialogService = inject(DialogService);

  async leaveChannel() {
    debugger;
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
      console.log(result);
      if (result)
        this.channelsService.updateChannel(
          this.channel?.customIdName as string,
          { members: firebase.firestore.FieldValue.arrayUnion(...result) as unknown as string[] });
    });
  }
}
