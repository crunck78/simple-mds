import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { DirectMessageTitleComponent } from 'src/app/shared/components/direct-message-title/direct-message-title.component';
import { ChannelTitleComponent } from 'src/app/shared/components/channel-title/channel-title/channel-title.component';

const imports = [CommonModule, MaterialModule, DirectMessageTitleComponent, ChannelTitleComponent];

@NgModule({
  imports: [...imports],
  exports: [...imports]
})
export class WorkspaceModule { }
