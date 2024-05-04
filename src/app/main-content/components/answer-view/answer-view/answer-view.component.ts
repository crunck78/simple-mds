import { Component, Input, OnChanges, OnDestroy, inject } from '@angular/core';
import { Answer } from 'src/app/shared/models/answer.class';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { User } from 'src/app/shared/models/user.class';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material.module';

@Component({
  selector: 'app-answer-view',
  templateUrl: './answer-view.component.html',
  styleUrls: ['./answer-view.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class AnswerViewComponent implements OnChanges, OnDestroy {

  @Input() answer: Answer | undefined;
  author: User | undefined;
  authorSub!: Subscription;
  private usersService = inject(UsersService);

  ngOnChanges(): void {
    this.authorSub?.unsubscribe();
    this.authorSub = this.usersService.getUser$(this.answer?.author as string)
      .subscribe(change => this.author = change as User);
  }

  ngOnDestroy(): void {
    this.authorSub?.unsubscribe();
  }
}
