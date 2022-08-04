import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { bindCallback } from 'rxjs';
import { Channel } from 'src/app/shared/models/channel.class';
import { Message, MessageFactory } from 'src/app/shared/models/message.class';
import { ChannelsService } from 'src/app/shared/services/channels/channels.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';

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

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelsService,
    private messageService: MessagesService,
    private router: Router
  ) {
    this.route.paramMap.subscribe(paramMap => {
      const channelId = paramMap.get('id') as string;

      this.channelService.getChannel$(channelId)
        .subscribe(change => this.channel = change as Channel);

      this.messageService.getMessagesByChannel$(channelId)
        .subscribe(changes => this.messages = changes as Message[]);
    });
  }

  ngOnInit(): void {
  }

  handleSaveInput(event: any) {
    const newMessage = this.createNewMessage();
    this.messageService.addMessage(newMessage.toJson());
  }

  createNewMessage() {
    const newMessage = new MessageFactory();
    newMessage.createdAt = new Date().getTime();
    newMessage.chatId = this.channel?.customIdName as string;
    newMessage.input = this.channelInput;

    return newMessage;
  }

  navigateToThread(message: Message) {
    //[routerLink]="[{outlets : {mainSide : ['channel', channel.customIdName]}}]"
    this.router.navigate([{outlets : {rightSide : ['message', message.customIdName]}}], {relativeTo : this.route.parent});
  }
}
