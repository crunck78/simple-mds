import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription, take } from 'rxjs';
import { Channel } from 'src/app/shared/models/channel.class';
import { User } from 'src/app/shared/models/user.class';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ChannelsService } from 'src/app/shared/services/channels/channels.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-add-members',
  standalone: true,
  templateUrl: './add-members.component.html',
  styleUrl: './add-members.component.scss',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule]
})
export class AddMembersComponent implements OnInit, OnDestroy {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;
  channel!: Channel;

  addMembersForm = new FormGroup({
    searchUsers: new FormControl("")
  });
  addMembersFormSub!: Subscription;

  selectedUsers: User[] = [];
  searchedUsers: User[] = [];
  searchedUsersSub!: Subscription;

  private dialogRef = inject(MatDialogRef<AddMembersComponent>);
  private usersService = inject(UsersService);
  private channelsService = inject(ChannelsService);

  ngOnInit(): void {
    this.addMembersFormSub = this.addMembersForm
      .valueChanges
      .subscribe(changes => this.handleSearchUsersChange(changes));
  }

  handleSearchUsersChange(changes: { searchUsers?: string | null | undefined }) {
    if (!!changes.searchUsers && changes.searchUsers.length > 0) {
      this.usersService.getUsersByDisplayName$(changes.searchUsers)
        .pipe(take(1))
        .subscribe(matches => {
          this.searchedUsers = matches.filter(m => !this.channel.members.includes(m.uid)) as User[];
        });
    }
  }

  remove(user: User): void {
    const index = this.selectedUsers.indexOf(user);
    if (index >= 0)
      this.selectedUsers.splice(index, 1);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = event.option.value as User;
    this.selectedUsers.push(selectedUser);
    this.nameInput.nativeElement.value = '';
    this.addMembersForm.get('searchUsers')?.setValue(null);
  }

  handleAddMembers() {
    const newMembers = this.searchedUsers
      .filter(u => !this.channel.members.includes(u.uid))
      .map(u => u.uid);
    this.dialogRef.close(newMembers);
  }

  isAlreadySelected(searchedUsers: User) {
    return this.selectedUsers.some(selectedUser => selectedUser.uid == searchedUsers.uid);
  }

  ngOnDestroy(): void {
    this.addMembersFormSub?.unsubscribe();
    this.searchedUsersSub?.unsubscribe();
  }
}
