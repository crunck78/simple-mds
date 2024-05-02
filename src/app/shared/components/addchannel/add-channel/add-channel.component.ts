import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'src/app/shared/models/channel.class';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss']
})
export class AddChannelComponent {

  readonly MAX_LENGTH = 80;
  addChannelForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(this.MAX_LENGTH)])),
    description: new FormControl(''),
    closed: new FormControl(false),
  })

  constructor(
    private dialogRef: MatDialogRef<AddChannelComponent>,
  ) { }

  handleCreateChannel() {
    const channel = {
      name: this.addChannelForm.value.name,
      description: this.addChannelForm.value.description,
      closed: this.addChannelForm.value.closed,
      messages: [],
      members: [],
    } as Channel;
    this.dialogRef.close(channel);
  }

}
