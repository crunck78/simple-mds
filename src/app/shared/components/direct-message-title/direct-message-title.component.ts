import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { DirectMessage } from '../../models/direct-message.class';
import { User } from '../../models/user.class';
import { UsersService } from '../../services/users/users.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-direct-message-title',
  templateUrl: './direct-message-title.component.html',
  styleUrls: ['./direct-message-title.component.scss']
})
export class DirectMessageTitleComponent implements OnInit, OnChanges {

  @Input() directMessage: DirectMessage | undefined;
  members: User[] | undefined;

  constructor(private usersService: UsersService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.members = [];
    this.setMembers();
  }

  setMembers() {
    this.directMessage?.members
      .forEach(
        id => firstValueFrom(
          this.usersService.getUser$(id)
        ).then(
          (user) => { this.members?.push(user as User); console.log(this.members) }
        )
      )
  }

  isSignedInUser(user: User) {
    return  this.usersService.getSignedInUser$()
      .pipe(
        map((signedInUser : firebase.User | null) => signedInUser?.uid == user.uid)
      );
  }

  ngOnInit(): void {
  }

}
