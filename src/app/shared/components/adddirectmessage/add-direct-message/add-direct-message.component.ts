import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DirectMessage } from 'src/app/shared/models/direct-message.class';
import { User } from 'src/app/shared/models/user.class';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Subscription, take } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material.module';

@Component({
  selector: 'app-add-direct-message',
  templateUrl: './add-direct-message.component.html',
  styleUrls: ['./add-direct-message.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule]
})
export class AddDirectMessageComponent implements OnInit, OnDestroy {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  addDirectMessageForm = new FormGroup({
    searchUsers: new FormControl("")
  });
  addDirectMessageFormSub!: Subscription;

  selectedUsers: User[] = [];
  searchedUsers: User[] = [];
  searchedUsersSub!: Subscription;

  private dialogRef = inject(MatDialogRef<AddDirectMessageComponent>);
  private usersService = inject(UsersService);

  ngOnInit(): void {
    this.addDirectMessageFormSub = this.addDirectMessageForm
      .valueChanges
      .subscribe(changes => this.handleSearchUsersChange(changes));
  }

  handleSearchUsersChange(changes: { searchUsers?: string | null | undefined }) {
    if (!!changes.searchUsers && changes.searchUsers.length > 0) {
      // this.searchedUsersSub?.unsubscribe();
      this.usersService.getUsersByDisplayName$(changes.searchUsers)
        .pipe(take(1))
        .subscribe(matches => {
          this.searchedUsers = matches as User[]
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
