import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Answer } from 'src/app/shared/models/answer.class';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { User } from 'src/app/shared/models/user.class';

@Component({
  selector: 'app-answer-view',
  templateUrl: './answer-view.component.html',
  styleUrls: ['./answer-view.component.scss']
})
export class AnswerViewComponent implements OnInit, OnChanges {

  @Input() answer: Answer | undefined;
  author: User | undefined;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.usersService.getUser$(this.answer?.author as string)
    .subscribe(change => this.author = change as User);
    console.log(this.answer);
  }

  ngOnInit(): void {
  }

}
