import { Component, Input, OnChanges, OnDestroy, inject } from '@angular/core';
import { Message } from 'src/app/shared/models/message.class';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { User } from 'src/app/shared/models/user.class';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material.module';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class MessageViewComponent implements OnChanges, OnDestroy {

  @Input() message: Message | undefined;
  author: User | undefined;
  authorSub!: Subscription;
  private usersService = inject(UsersService);

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
