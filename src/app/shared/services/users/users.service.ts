import { Injectable, inject } from '@angular/core';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { FirestoreService } from '../firestore/firestore.service';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users$!: Observable<User[]>;
  private fs = inject(FirestoreService);
  private auth = inject(AuthProcessService);

  constructor(){
    this.users$ = this.fs.getCollectionListener$('users') as unknown as Observable<User[]>;
  }
  getUsers$(): Observable<User[]> {
    return this.users$;
  }

  getUsersByDisplayName$(partialDisplayName: string): Observable<unknown[]> {
    return this.fs.getCollectionListener$('users', ref => ref.where('displayName', '>=', partialDisplayName));
  }

  addUser(answer: User) {
    this.fs.addToCollection('users', answer)
      .then(result => console.log(result))
      .catch(error => console.error(error));
  }

  getUser$(id: string): Observable<unknown> {
    return this.fs.getDocumentListenerFromCollection$('users', id);
  }

  getSignedInUser$(): Observable<firebase.User | null> {
    return this.auth.afa.user;
  }

  updateUser(id: string, data: Partial<unknown>): Promise<void> {
    return this.fs.updateDocument('users', id, data);
  }
}
