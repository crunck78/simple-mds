import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../../models/answer.class';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  private answers$: Observable<Answer[]>;
  private answers: Answer[];

  constructor(private fs: FirestoreService) {
    this.answers = [];
    this.answers$ = this.fs.getCollectionListener$('answers') as unknown as Observable<Answer[]>;
    //this.answers$.subscribe((changes : Answer[]) => this.answers = changes);
  }

  getAnswers$(): Observable<Answer[]> {
    return this.answers$;
  }

  getAnswers(): Answer[] {
    return this.answers;
  }

  addAnswer(answer : Answer){
    this.fs.addToCollection('answers', answer)
    .then(result => console.log(result))
    .catch(error => console.error(error));
  }

  getAnswer$(id : string){
    return this.fs.getDocumentListener$('answers', id);
  }

  getAnswersByMessage$(messageId : string){
    return this.fs.getCollectionListener$('answers', ref => ref.where('messageId', '==', messageId));
  }
}
