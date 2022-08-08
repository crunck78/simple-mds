import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer, AnswerFactory } from 'src/app/shared/models/answer.class';
import { Channel } from 'src/app/shared/models/channel.class';
import { Message } from 'src/app/shared/models/message.class';
import { AnswersService } from 'src/app/shared/services/answers/answers.service';
import { ChannelsService } from 'src/app/shared/services/channels/channels.service';
import { MessagesService } from 'src/app/shared/services/messages/messages.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-thread-view',
  templateUrl: './thread-view.component.html',
  styleUrls: ['./thread-view.component.scss']
})
export class ThreadViewComponent implements OnInit {

  input: any;
  threadEditor = {
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

  threadInput: string = "";
  message: Message | undefined;
  channel: Channel | undefined;
  answers: Answer[] | undefined;
  signedInUser: firebase.User | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private channelsServices: ChannelsService,
    private answersService: AnswersService,
    private usersService: UsersService
  ) {
    this.route.paramMap.subscribe(paramMap => {
      const messageId = paramMap.get('id') as string;

      this.messagesService.getMessage$(messageId)
        .subscribe(changeInMessage => {
          this.message = changeInMessage as Message;

          this.channelsServices.getChannel$(this.message.chatId)
            .subscribe(changeInChannel => this.channel = changeInChannel as Channel);

          this.answersService.getAnswersByMessage$(messageId)
            .subscribe(changesInAnswers => this.answers = changesInAnswers as Answer[]);
        });
    });

    this.usersService.getSignedInUser$()
      .subscribe(change => this.signedInUser = change);

  }

  ngOnInit(): void {
  }

  handleSaveInput(event: any) {
    const newAnswer = this.createNewAnswer();
    this.answersService.addAnswer(newAnswer.toJson());
  }

  createNewAnswer() {
    const newMessage = new AnswerFactory();
    newMessage.createdAt = new Date().getTime();
    newMessage.messageId = this.message?.customIdName as string;
    newMessage.input = this.threadInput;
    newMessage.author = this.signedInUser?.uid as string;

    return newMessage;
  }

}
