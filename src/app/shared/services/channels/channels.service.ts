import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../firestore/firestore.service';
import { Channel } from '../../models/channel.class';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  private channels$: Observable<Channel[]>;
  private channels: Channel[];

  constructor(private fs: FirestoreService) {
    this.channels = [];
    this.channels$ = this.fs.getCollectionListener$('channels') as unknown as Observable<Channel[]>;
    //this.channels$.subscribe((changes : Channel[]) => this.channels = changes);
  }

  getChannels$(): Observable<Channel[]> {
    return this.channels$;
  }

  getChannels(): Channel[] {
    return this.channels;
  }

  addChannel(channel : Channel){
    this.fs.addToCollection('channels', channel)
    .then(result => console.log(result))
    .catch(error => console.error(error));
  }

  getChannel$(id : string){
    return this.fs.getDocumentListener$('channels', id);
  }

}
