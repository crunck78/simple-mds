import { Component, Input, OnChanges, OnDestroy, inject } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { DirectMessage } from '../../models/direct-message.class';
import { User } from '../../models/user.class';
import { UsersService } from '../../services/users/users.service';
import firebase from 'firebase/compat/app';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-direct-message-title',
  templateUrl: './direct-message-title.component.html',
  styleUrls: ['./direct-message-title.component.scss'],
  standalone: true,
  imports: [CommonModule]

})
export class DirectMessageTitleComponent implements OnChanges, OnDestroy {
  @Input() directMessage: DirectMessage | undefined;
  members: User[] | undefined;
  membersSub!: Subscription;
  private usersService = inject(UsersService);

  ngOnChanges(): void {
    this.setMembers();
  }

  setMembers() {
    if(!this.directMessage) return
    this.members = [];
    this.membersSub?.unsubscribe();
    this.membersSub = this.usersService.getUsersByIdList$(this.directMessage?.members)
      .subscribe(members => this.members = members as User[]);
  }

  isSignedInUser(user: User) {
    return this.usersService.getSignedInUser$()
      .pipe(
        map((signedInUser: firebase.User | null) => signedInUser?.uid == user.uid)
      );
  }

  ngOnDestroy(): void {
    this.membersSub?.unsubscribe();
  }
}
