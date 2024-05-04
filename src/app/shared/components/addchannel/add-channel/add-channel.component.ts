import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'src/app/shared/models/channel.class';
import { MaterialModule } from 'src/app/shared/modules/material.module';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule]
})
export class AddChannelComponent {

  readonly MAX_LENGTH = 80;
  addChannelForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(this.MAX_LENGTH)])),
    description: new FormControl(''),
    closed: new FormControl(false),
  });
  private dialogRef = inject( MatDialogRef<AddChannelComponent>);

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
