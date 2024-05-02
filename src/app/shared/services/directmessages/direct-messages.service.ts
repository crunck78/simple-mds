import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectMessage } from '../../models/direct-message.class';
import { FirestoreService } from './../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class DirectMessagesService {

  private directMessages$: Observable<DirectMessage[]>;

  constructor(private fs: FirestoreService) {
    this.directMessages$ = this.fs.getCollectionListener$('directMessages') as unknown as Observable<DirectMessage[]>;
  }

  getDirectMessages$(): Observable<DirectMessage[]> {
    return this.directMessages$;
  }

  addDirectMessage(channel: DirectMessage) {
    this.fs.addToCollection('directMessages', channel)
      .then(result => console.log(result))
      .catch(error => console.error(error));
  }

  getDirectMessage$(id: string) {
    return this.fs.getDocumentListener$('directMessages', id);
  }

}
