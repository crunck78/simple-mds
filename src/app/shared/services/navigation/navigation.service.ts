import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/shared/models/message.class';
import { DirectMessage } from 'src/app/shared/models/direct-message.class';
import { Channel } from 'src/app/shared/models/channel.class';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  navigateToWorkspace() {
    this.router.navigateByUrl('/workspace');
  }

  navigateToAuthentication() {
    this.router.navigate(
      [{ outlets: { mainSide: ['auth'] } }],
      { relativeTo: this.route.parent }
    );
  }

  navigateToThreadByMessage(message: Message) {
    this.router.navigate(
      [{ outlets: { rightSide: ['message', message.customIdName] } }],
      { relativeTo: this.route.parent }
    );
  }

  navigateToChannel(channel: Channel) {
    return this.router.navigate(
      [{ outlets: { mainSide: ['channel', channel.customIdName] } }],
      { relativeTo: this.route.parent }
    );
  }

  navigateToDM(channel: DirectMessage) {
    this.router.navigate(
      [{ outlets: { mainSide: ['direct-messages', channel.customIdName] } }],
      { relativeTo: this.route.parent }
    );
  }
}
