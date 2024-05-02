import { Injectable } from '@angular/core';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { FirestoreService } from '../firestore/firestore.service';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users$: Observable<User[]>;

  constructor(
    private fs: FirestoreService,
    private auth: AuthProcessService) {
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
    return this.fs.getDocumentListener$('users', id);
  }

  getSignedInUser$(): Observable<firebase.User | null> {
    return this.auth.afa.user;
  }
}
