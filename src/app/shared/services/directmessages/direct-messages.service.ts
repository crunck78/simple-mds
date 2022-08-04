import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from './../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class DirectMessagesService {

  private directMessages$: Observable<{
    customIdName: string;
  }[]>;

  constructor(private fs: FirestoreService) {
    this.directMessages$ = this.fs.getCollectionListener$('directMessages') as any;
  }

  getDirectMessages$(): Observable<{
    customIdName: string;
  }[]> {
    return this.directMessages$;
  }

}
