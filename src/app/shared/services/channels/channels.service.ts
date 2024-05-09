import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom, take } from 'rxjs';
import { FirestoreService } from '../firestore/firestore.service';
import { Channel } from '../../models/channel.class';
import { AuthenticationService } from '../authentication/authentication.service';
import { FeedbackService } from '../feedback/feedback.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  private channels$!: Observable<Channel[]>;
  private fs = inject(FirestoreService);
  private auth = inject(AuthenticationService);
  private feedback = inject(FeedbackService);

  constructor() {
    this.channels$ = this.fs.getCollectionListener$('channels') as unknown as Observable<Channel[]>;
  }

  getChannels$(): Observable<Channel[]> {
    return this.channels$;
  }

  getMemberedChannels$(): Observable<Channel[]> {
    return this.fs.getCollectionListener$(
      'channels',
      ref => ref.where('members', 'array-contains', this.auth.user?.uid)) as unknown as Observable<Channel[]>;
  }

  async addChannel(channel: Channel) {
    try {
      const user = await firstValueFrom(this.auth.user$);
      if (!user) throw new Error("Not Allowed!");
      const results = await firstValueFrom(this.getChannelsByName$(channel.name));
      if (results.length > 0) throw new Error(`Channel ${channel.name} already exists!`);
      if (!channel.members.includes(user.uid)) channel.members.push(user.uid);
      await this.fs.addToCollection('channels', channel);
    } catch (error: any) {
      this.feedback.showFeedback(error.message);
    }
  }

  getChannelsByName$(name: string) {
    return this.fs.getCollectionListener$('channels', ref => ref.where('name', '==', name))
  }

  getChannel$(id: string) {
    return this.fs.getDocumentListenerFromCollection$('channels', id);
  }

  async deleteChannel(channelId: string) {
    return this.fs.deleteDocumentById('channels', channelId);
  }
}
