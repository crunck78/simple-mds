import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { DirectMessage } from '../../models/direct-message.class';
import { FirestoreService } from './../firestore/firestore.service';
import { AuthenticationService } from '../authentication/authentication.service';
import firebase from 'firebase/compat/app';
import { FeedbackService } from '../feedback/feedback.service';

@Injectable({
  providedIn: 'root'
})
export class DirectMessagesService {

  private directMessages$!: Observable<DirectMessage[]>;
  private fs = inject(FirestoreService);
  private auth = inject(AuthenticationService);
  private feedback = inject(FeedbackService);

  constructor() {
    this.directMessages$ = this.fs.getCollectionListener$('directMessages') as unknown as Observable<DirectMessage[]>;
  }

  getDirectMessages$(): Observable<DirectMessage[]> {
    return this.directMessages$;
  }

  getMemberedDirectMessages$(): Observable<DirectMessage[]> {
    return this.fs.getCollectionListener$(
      'directMessages',
      ref => ref.where('members', 'array-contains', this.auth.user?.uid)) as unknown as Observable<DirectMessage[]>;
  }

  async addDirectMessage(channel: DirectMessage) {
    try {
      const user = await firstValueFrom(this.auth.user$);
      if (!user) throw new Error("Not Allowed!");
      if (!channel.members.includes(user.uid)) channel.members.push(user.uid);
      const results = await firstValueFrom(this.getMemberedDirectMessages$());
      const channelMembersString = channel.members.sort().join(',');
      const isDuplicate = results.some(dm => {
        const dmMembersString = dm.members.sort().join(',');
        return dmMembersString === channelMembersString;
      });
      if (isDuplicate) throw new Error("A direct message with the same members already exists!");
      await this.fs.addToCollection('directMessages', channel);
    } catch (error: any) {
      this.feedback.showFeedback(error.message);
    }
  }

  getDirectMessage$(id: string) {
    return this.fs.getDocumentListenerFromCollection$('directMessages', id);
  }
}
