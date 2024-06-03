import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { FirestoreService } from '../firestore/firestore.service';
import { Channel } from '../../models/channel.class';
import { AuthenticationService } from '../authentication/authentication.service';
import { FeedbackService } from '../feedback/feedback.service';
import { CollectionReference } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

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

  getChannelsByNameQuery$(partialChannelName: string, queryClosedChannels: boolean = false): Observable<Channel[]> {
    // Calculate the end string by incrementing the last character of the input string
    const endString = partialChannelName.slice(0, -1) + String.fromCharCode(partialChannelName.charCodeAt(partialChannelName.length - 1) + 1);

    let query = (ref: CollectionReference<firebase.firestore.DocumentData>) =>
      ref.where('name', '>=', partialChannelName)
        .where('name', '<', endString)
        .where('closed', '==', queryClosedChannels);
    return this.fs.getCollectionListener$('channels', query) as unknown as Observable<Channel[]>;
  }

  getChannel$(id: string) : Observable<Channel> {
    return this.fs.getDocumentListenerFromCollection$('channels', id) as unknown as Observable<Channel>;
  }

  async deleteChannel(channelId: string) {
    return this.fs.deleteDocumentById('channels', channelId);
  }

  updateChannel(channelId: string, channelPartial: Partial<Channel>) {
    return this.fs.updateDocument('channels', channelId, channelPartial)
  }

  async isMemberOfChannel(channel: Channel | undefined) {
    if (!channel) return false;
    const user = await firstValueFrom(this.auth.user$);
    if (!user) return false;
    return channel.members.includes(user.uid);
  }

  async joinChannel(channelId: string) {
    try {
      const user = await firstValueFrom(this.auth.user$);
      if (!user) throw new Error("Not Allowed!");
      await this.addMembersToChannel(channelId, [user.uid]);
      return true;
    } catch (error: any) {
      this.feedback.showFeedback(error.message);
      return false;
    }
  }

  addMembersToChannel(channelId: string, members: string[]) {
    return this.updateChannel(
      channelId,
      { members: firebase.firestore.FieldValue.arrayUnion(...members) as unknown as string[] });
  }
}
