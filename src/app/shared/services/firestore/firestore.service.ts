import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference, QueryFn } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private fs: AngularFirestore) { }

  addToCollection(collectionName: string, newItem: unknown): Promise<DocumentReference<unknown>> {
    return this.getCollection(collectionName)
      .add(newItem);
  }

  getCollectionListener$(collectionName: string, queryFn?: QueryFn): Observable<unknown[]> {
    return this.getCollection(collectionName, queryFn).valueChanges({ idField: "customIdName" }) as Observable<unknown[]>;
  }

  getCollection(collectionName: string, queryFn?: QueryFn): AngularFirestoreCollection<unknown> {
    return queryFn ? this.fs.collection(collectionName, queryFn) : this.fs.collection(collectionName);
  }

  getDocumentById(collectionName: string, id: string): AngularFirestoreDocument<unknown> {
    return this.getCollection(collectionName).doc(id);
  }

  getDocumentListener$(collectionName: string, id: string): Observable<unknown | undefined> {
    return this.getDocumentById(collectionName, id).valueChanges({ idField: "customIdName" }) as Observable<unknown | undefined>;
  }

}
