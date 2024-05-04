import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Channel } from 'src/app/shared/models/channel.class';
import { MaterialModule } from 'src/app/shared/modules/material.module';

@Component({
  selector: 'app-channel-title',
  templateUrl: './channel-title.component.html',
  styleUrls: ['./channel-title.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class ChannelTitleComponent {
  @Input() channel : Channel | undefined;
}
