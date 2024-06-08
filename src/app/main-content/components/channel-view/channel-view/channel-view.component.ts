import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/app/shared/models/channel.class';
import { Message, MessageFactory } from 'src/app/shared/models/message.class';
import { ChannelsService } from 'src/app/shared/services/channels/channels.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import firebase from 'firebase/compat/app';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ChannelTitleComponent } from 'src/app/shared/components/channel-title/channel-title/channel-title.component';
import { MessageViewComponent } from '../../message-view/message-view/message-view.component';
import { FormsModule } from '@angular/forms';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';

type ToolbarLocation = 'top' | 'bottom' | 'auto';

@Component({
  selector: 'app-channel-view',
  templateUrl: './channel-view.component.html',
  styleUrls: ['./channel-view.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, EditorModule, ChannelTitleComponent, MessageViewComponent, FormsModule]
})
export class ChannelViewComponent implements OnInit, OnDestroy {

  input: any;
  openEditor = false;
  channelEditor = {
    plugins: ['autoresize', 'save'],
    toolbar: ['save'],
    menubar: false,
    max_height: 300,
    min_height: 100,
    resize: false,
    placeholder: 'Type here...',
    id: 'channel',
    outputFormat: "html",
    toolbar_location: 'bottom' as ToolbarLocation,
    save_onsavecallback: this.handleSaveInput.bind(this),
  };
  channelInput: string = "";
  channel: Channel | undefined;
  channelSub!: Subscription;
  messages: Message[] | undefined;
  messagesSub!: Subscription;
  signedInUser: firebase.User | null | undefined;
  signedInUserSub!: Subscription;

  private route = inject(ActivatedRoute);
  private channelsService = inject(ChannelsService);
  private messagesService = inject(MessagesService);
  private usersService = inject(UsersService);
  public navigationService = inject(NavigationService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const channelId = paramMap.get('id') as string;

      this.channelSub?.unsubscribe();
      this.channelSub = this.channelsService.getChannel$(channelId)
        .subscribe(change => this.channel = change as Channel);

      this.messagesSub?.unsubscribe();
      this.messagesSub = this.messagesService.getMessagesByChannel$(channelId)
        .subscribe(changes => this.messages = changes as Message[]);
    });
    this.signedInUserSub?.unsubscribe();
    this.signedInUserSub = this.usersService.getSignedInUser$()
      .subscribe(change => this.signedInUser = change);
  }

  ngOnDestroy(): void {
    this.channelSub?.unsubscribe();
    this.messagesSub?.unsubscribe();
    this.signedInUserSub?.unsubscribe();
  }

  async handleSaveInput(event: any) {
    const newMessage = this.createNewMessage();
    const result = await this.messagesService.addMessage(newMessage.toJson());
    if (result) this.channelInput = "";
  }

  createNewMessage() {
    const newMessage = new MessageFactory();
    newMessage.createdAt = new Date().getTime();
    newMessage.chatId = this.channel?.customIdName as string;
    newMessage.input = this.channelInput;
    newMessage.author = this.signedInUser?.uid as string;
    newMessage.imageUrls = [];

    return newMessage;
  }

  toggleEditor(){
    this.openEditor = !this.openEditor;
  }
}
