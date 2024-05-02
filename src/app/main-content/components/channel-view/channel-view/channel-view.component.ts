import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Channel } from 'src/app/shared/models/channel.class';
import { Message, MessageFactory } from 'src/app/shared/models/message.class';
import { ChannelsService } from 'src/app/shared/services/channels/channels.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import firebase from 'firebase/compat/app';
import { Subscription } from 'rxjs';

type ToolbarLocation = 'top' | 'bottom' | 'auto';

@Component({
  selector: 'app-channel-view',
  templateUrl: './channel-view.component.html',
  styleUrls: ['./channel-view.component.scss']
})
export class ChannelViewComponent implements OnDestroy {

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
  channelInput: string = "";
  channel: Channel | undefined;
  channelSub!: Subscription;
  messages: Message[] | undefined;
  messagesSub!: Subscription;
  signedInUser: firebase.User | null | undefined;
  signedInUserSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private channelsService: ChannelsService,
    private messagesService: MessagesService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.route.paramMap.subscribe(paramMap => {
      const channelId = paramMap.get('id') as string;
      this.channelSub = this.channelsService.getChannel$(channelId)
        .subscribe(change => this.channel = change as Channel);
      this.messagesSub = this.messagesService.getMessagesByChannel$(channelId)
        .subscribe(changes => this.messages = changes as Message[]);
    });
    this.signedInUserSub = this.usersService.getSignedInUser$()
      .subscribe(change => this.signedInUser = change);
  }

  ngOnDestroy(): void {
    this.channelSub.unsubscribe();
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
    newMessage.chatId = this.channel?.customIdName as string;
    newMessage.input = this.channelInput;
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
