import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChannelTitleComponent } from '../../channel-title/channel-title/channel-title.component';
import { MemberProfileTitleComponent } from '../../member-profile-title/member-profile-title.component';

const imports = [
  CommonModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
  ChannelTitleComponent,
  MemberProfileTitleComponent
];

@NgModule({
  declarations: [],
  imports: [...imports],
  exports: [...imports]
})
export class SearchWorkspaceModule { }
