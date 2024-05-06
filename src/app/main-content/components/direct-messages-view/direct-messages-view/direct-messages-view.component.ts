import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { MessageViewComponent } from '../../message-view/message-view/message-view.component';
import { Message, MessageFactory } from 'src/app/shared/models/message.class';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DirectMessage } from 'src/app/shared/models/direct-message.class';
import firebase from 'firebase/compat/app';
import { DirectMessagesService } from 'src/app/shared/services/directmessages/direct-messages.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { DirectMessageTitleComponent } from 'src/app/shared/components/direct-message-title/direct-message-title.component';

type ToolbarLocation = 'top' | 'bottom' | 'auto';

@Component({
  selector: 'app-direct-messages-view',
  standalone: true,
  imports: [CommonModule, MaterialModule, EditorModule, MessageViewComponent, FormsModule, DirectMessageTitleComponent],
  templateUrl: './direct-messages-view.component.html',
  styleUrl: './direct-messages-view.component.scss'
})
export class DirectMessagesViewComponent implements OnInit, OnDestroy {

  input: any;
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

  directMessagesInput: string = "";
  directMessagesSub!: Subscription;
  directMessages: DirectMessage | undefined;
  messages: Message[] | undefined;
  messagesSub!: Subscription;
  signedInUser: firebase.User | null | undefined;
  signedInUserSub!: Subscription;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private directMessagesService = inject(DirectMessagesService);
  private messagesService = inject(MessagesService);
  private usersService = inject(UsersService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const directMessagesId = paramMap.get('id') as string;
      this.directMessagesSub = this.directMessagesService.getDirectMessage$(directMessagesId)
        .subscribe(change => this.directMessages = change as DirectMessage);
      this.messagesSub = this.messagesService.getMessagesByChannel$(directMessagesId)
        .subscribe(changes => this.messages = changes as Message[]);
    });
    this.signedInUserSub = this.usersService.getSignedInUser$()
      .subscribe(change => this.signedInUser = change);
  }

  ngOnDestroy(): void {
    this.directMessagesSub.unsubscribe();
    this.messagesSub.unsubscribe();
    this.signedInUserSub.unsubscribe();
  }

  handleSaveInput(event: any) {
    const newMessage = this.createNewMessage();
    this.messagesService.addMessage(newMessage.toJson());
  }

  createNewMessage() {
    const newMessage = new MessageFactory();
    newMessage.createdAt = new Date().getTime();
    newMessage.chatId = this.directMessages?.customIdName as string;
    newMessage.input = this.directMessagesInput;
    newMessage.author = this.signedInUser?.uid as string;
    newMessage.imageUrls = [];

    return newMessage;
  }

  navigateToThread(message: Message) {
    this.router.navigate(
      [{ outlets: { rightSide: ['message', message.customIdName] } }],
      { relativeTo: this.route.parent }
    );
  }
}
