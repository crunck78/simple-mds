import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference, QueryFn } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private fs = inject(AngularFirestore);

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

  getDocumentFromCollectionById(collectionName: string, id: string): AngularFirestoreDocument<unknown> {
    return this.getCollection(collectionName).doc(id);
  }

  getDocumentListenerFromCollection$(collectionName: string, id: string): Observable<unknown | undefined> {
    return this.getDocumentFromCollectionById(collectionName, id).valueChanges({ idField: "customIdName" }) as Observable<unknown | undefined>;
  }

  getDocumentById(id: string): AngularFirestoreDocument<unknown> {
    return this.fs.doc(id);
  }

  updateDocument(collectionName: string, id: string, data: Partial<unknown>): Promise<void> {
    return this.getDocumentFromCollectionById(collectionName, id).update(data);
  }

  deleteDocumentById(collection: string, docId: string): Promise<void> {
    return this.fs.doc(collection + '/' + docId).delete();
  }
}
