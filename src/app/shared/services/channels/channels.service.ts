import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { FirestoreService } from '../firestore/firestore.service';
import { Channel } from '../../models/channel.class';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  private channels$!: Observable<Channel[]>;
  private fs = inject(FirestoreService);
  private auth = inject(AuthenticationService);

  constructor() {
    this.channels$ = this.fs.getCollectionListener$('channels') as unknown as Observable<Channel[]>;
  }

  getChannels$(): Observable<Channel[]> {
    return this.channels$;
  }

  async addChannel(channel: Channel) {
    try {
      const user = await firstValueFrom(this.auth.user$);
      if (!user) throw new Error("Not Allowed!");
      channel.members.push(user.uid);
      await this.fs.addToCollection('channels', channel);
    } catch (error) {
      console.error(error);
    }
  }

  getChannel$(id: string) {
    return this.fs.getDocumentListenerFromCollection$('channels', id);
  }

}
