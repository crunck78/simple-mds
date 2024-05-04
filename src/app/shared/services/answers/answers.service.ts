import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../../models/answer.class';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  private answers$!: Observable<Answer[]>;
  private fs = inject(FirestoreService);

  constructor() {
    this.answers$ = this.fs.getCollectionListener$('answers') as unknown as Observable<Answer[]>;
  }

  getAnswers$(): Observable<Answer[]> {
    return this.answers$;
  }

  addAnswer(answer: Answer) {
    this.fs.addToCollection('answers', answer)
      .then(result => console.log(result))
      .catch(error => console.error(error));
  }

  getAnswer$(id: string) {
    return this.fs.getDocumentListenerFromCollection$('answers', id);
  }

  getAnswersByMessage$(messageId: string) {
    return this.fs.getCollectionListener$('answers', ref => ref.where('messageId', '==', messageId));
  }
}
