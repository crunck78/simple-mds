import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Channel } from 'src/app/shared/models/channel.class';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ChannelsService } from 'src/app/shared/services/channels/channels.service';

@Component({
  selector: 'app-channel-title',
  templateUrl: './channel-title.component.html',
  styleUrls: ['./channel-title.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class ChannelTitleComponent {
  @Input() channel : Channel | undefined;
  private channelsService = inject(ChannelsService)

  deleteChannel(){
    if (!this.channel?.customIdName) return;
    this.channelsService.deleteChannel(this.channel.customIdName as string);
  }
}
