import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DirectMessage } from 'src/app/shared/models/direct-message.class';
import { User } from 'src/app/shared/models/user.class';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-direct-message',
  templateUrl: './add-direct-message.component.html',
  styleUrls: ['./add-direct-message.component.scss']
})
export class AddDirectMessageComponent implements OnDestroy {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  addDirectMessageForm = new FormGroup({
    searchUsers: new FormControl("")
  });
  addDirectMessageFormSub!: Subscription;

  selectedUsers: User[] = [];
  searchedUsers: User[] = [];
  searchedUsersSub!: Subscription;

  constructor(
    private dialogRef: MatDialogRef<AddDirectMessageComponent>,
    private usersService: UsersService
  ) {
    this.addDirectMessageFormSub = this.addDirectMessageForm
      .valueChanges
      .subscribe(changes => this.handleSearchUsersChange(changes));
  }

  handleSearchUsersChange(changes: { searchUsers?: string | null | undefined }) {

    if (!!changes.searchUsers && changes.searchUsers.length > 0) {
      this.searchedUsersSub?.unsubscribe();
      this.usersService.getUsersByDisplayName$(changes.searchUsers)
        .subscribe(matches => this.searchedUsers = matches as User[]);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = event.value;
    if (value) {
      //this.selectedUsers.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    //this.fruitCtrl.setValue(null);
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
    this.addDirectMessageForm.get('searchUsers')?.setValue(null);
  }

  handleCreateDirectMessage() {
    const directMessage = {
      messages: [],
      members: this.selectedUsers.map(selectedUser => selectedUser.uid)
    } as DirectMessage;
    this.dialogRef.close(directMessage);
  }

  isAlreadySelected(searchedUsers: User) {
    return this.selectedUsers.some(selectedUser => selectedUser.uid == searchedUsers.uid);
  }

  ngOnDestroy(): void {
    this.addDirectMessageFormSub.unsubscribe();
    this.searchedUsersSub?.unsubscribe();
  }
}
