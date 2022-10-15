import { Injectable } from '@angular/core';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { FirestoreService } from '../firestore/firestore.service';
import firebase from 'firebase/compat/app';
import { CollectionReference, DocumentData, Query, QueryFn, QueryGroupFn } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users$: Observable<User[]>;
  private users: User[];

  constructor(
    private fs: FirestoreService,
    private auth: AuthProcessService) {
    this.users = [];
    this.users$ = this.fs.getCollectionListener$('users') as unknown as Observable<User[]>;
    //this.users$.subscribe((changes : User[]) => this.users = changes);
  }

  getUsers$(): Observable<User[]> {
    return this.users$;
  }

  getUsersByDisplayName$(partialDisplayName: string): Observable<unknown[]> {
    return this.fs.getCollectionListener$('users', ref => ref.where('displayName', '>=', partialDisplayName));
  }

  getUsers(): User[] {
    return this.users;
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
