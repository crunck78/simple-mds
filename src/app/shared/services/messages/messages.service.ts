import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../models/message.class';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messages$: Observable<Message[]>;

  constructor(private fs: FirestoreService) {
    this.messages$ = this.fs.getCollectionListener$('messages') as unknown as Observable<Message[]>;
  }

  getMessages$(): Observable<Message[]> {
    return this.messages$;
  }

  addMessage(message: Message) {
    this.fs.addToCollection('messages', message)
      .then(result => console.log(result))
      .catch(error => console.error(error));
  }

  getMessage$(id: string) {
    return this.fs.getDocumentListener$('messages', id);
  }

  getMessagesByChannel$(channelId: string) {
    return this.fs.getCollectionListener$('messages', ref => ref.where('chatId', '==', channelId));
  }

}
