import { Component, Input } from '@angular/core';
import { Channel } from 'src/app/shared/models/channel.class';

@Component({
  selector: 'app-channel-title',
  templateUrl: './channel-title.component.html',
  styleUrls: ['./channel-title.component.scss']
})
export class ChannelTitleComponent {
  @Input() channel : Channel | undefined;
}
