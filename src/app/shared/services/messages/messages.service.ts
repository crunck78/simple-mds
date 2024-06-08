import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../models/message.class';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messages$!: Observable<Message[]>;
  private fs = inject(FirestoreService);

  constructor() {
    this.messages$ = this.fs.getCollectionListener$('messages') as unknown as Observable<Message[]>;
  }

  getMessages$(): Observable<Message[]> {
    return this.messages$;
  }

  async addMessage(message: Message) {
    try {
      const result = await this.fs.addToCollection('messages', message);
      return true;
    } catch (error) {
      return false;
    }
  }

  getMessage$(id: string) {
    return this.fs.getDocumentListenerFromCollection$('messages', id);
  }

  getMessagesByChannel$(channelId: string) {
    return this.fs.getCollectionListener$('messages', ref => ref.where('chatId', '==', channelId));
  }

}
