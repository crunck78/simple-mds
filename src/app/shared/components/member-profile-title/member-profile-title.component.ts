import { Component, Input } from '@angular/core';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-profile-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-profile-title.component.html',
  styleUrl: './member-profile-title.component.scss'
})
export class MemberProfileTitleComponent {
  @Input() member!: User;
}
