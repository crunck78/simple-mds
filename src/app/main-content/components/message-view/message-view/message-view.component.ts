import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Message } from 'src/app/shared/models/message.class';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { User } from 'src/app/shared/models/user.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnChanges, OnDestroy {

  @Input() message: Message | undefined;
  author: User | undefined;
  authorSub!: Subscription;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnChanges(): void {
    this.authorSub?.unsubscribe();
    this.authorSub = this.usersService.getUser$(this.message?.author as string)
      .subscribe(change => this.author = change as User);
    console.log(this.message);
  }

  ngOnDestroy(): void {
    this.authorSub?.unsubscribe();
  }

}
