import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { DirectMessage } from '../../models/direct-message.class';
import { FirestoreService } from './../firestore/firestore.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DirectMessagesService {

  private directMessages$!: Observable<DirectMessage[]>;
  private fs = inject(FirestoreService);
  private auth = inject(AuthenticationService);

  constructor() {
    this.directMessages$ = this.fs.getCollectionListener$('directMessages') as unknown as Observable<DirectMessage[]>;
  }

  getDirectMessages$(): Observable<DirectMessage[]> {
    return this.directMessages$;
  }

  async addDirectMessage(channel: DirectMessage) {
    try {
      const user = await firstValueFrom(this.auth.user$);
      if (!user) throw new Error("Not Allowed!");
      if (!channel.members.includes(user.uid)) channel.members.push(user.uid);
      await this.fs.addToCollection('directMessages', channel);
    } catch (error) {
      console.error(error);
    }
  }

  getDirectMessage$(id: string) {
    return this.fs.getDocumentListenerFromCollection$('directMessages', id);
  }
}
