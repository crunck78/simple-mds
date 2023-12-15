import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Channel } from 'src/app/shared/models/channel.class';
import { Message, MessageFactory } from 'src/app/shared/models/message.class';
import { ChannelsService } from 'src/app/shared/services/channels/channels.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-channel-view',
  templateUrl: './channel-view.component.html',
  styleUrls: ['./channel-view.component.scss']
})
export class ChannelViewComponent implements OnInit {

  input: any;
  channelEditor = {
    // setup: (editor: any) => {
    plugins: ['autoresize', 'save'],
    toolbar: ['save'],
    menubar: false,
    max_height: 300,
    min_height: 100,
    resize: false,
    placeholder: 'Type here...',
    id: 'channel',
    outputFormat: "html",
    toolbar_location: 'bottom',
    save_onsavecallback: this.handleSaveInput.bind(this),
  }


  channelInput: string = "";
  channel: Channel | undefined;
  messages: Message[] | undefined;
  signedInUser: firebase.User | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private channelsService: ChannelsService,
    private messagesService: MessagesService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.route.paramMap.subscribe(paramMap => {
      const channelId = paramMap.get('id') as string;

      this.channelsService.getChannel$(channelId)
        .subscribe(change => this.channel = change as Channel);

      this.messagesService.getMessagesByChannel$(channelId)
        .subscribe(changes => this.messages = changes as Message[]);
    });

    this.usersService.getSignedInUser$()
      .subscribe(change => this.signedInUser = change);
  }

  ngOnInit(): void {
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
    //[routerLink]="[{outlets : {mainSide : ['channel', channel.customIdName]}}]"
    this.router.navigate([{outlets : {rightSide : ['message', message.customIdName]}}], {relativeTo : this.route.parent});
  }
}
