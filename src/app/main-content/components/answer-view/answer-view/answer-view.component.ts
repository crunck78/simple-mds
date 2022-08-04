import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/shared/models/answer.class';

@Component({
  selector: 'app-answer-view',
  templateUrl: './answer-view.component.html',
  styleUrls: ['./answer-view.component.scss']
})
export class AnswerViewComponent implements OnInit {

  @Input() answer: Answer | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
