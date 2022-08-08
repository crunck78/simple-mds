import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Message } from 'src/app/shared/models/message.class';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { User } from 'src/app/shared/models/user.class';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit, OnChanges {

  @Input() message: Message | undefined;
  author: User | undefined;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.usersService.getUser$(this.message?.author as string)
    .subscribe(change => this.author = change as User);
    console.log(this.message);
  }

  ngOnInit(): void {
  }

}
