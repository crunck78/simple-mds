import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SearchWorkspaceModule } from './search-workspace.module';
import { FormControl } from '@angular/forms';
import { Subscription, take } from 'rxjs';
import { Channel } from 'src/app/shared/models/channel.class';
import { User } from 'src/app/shared/models/user.class';
import { ChannelsService } from 'src/app/shared/services/channels/channels.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

type SearchTag = "#" | "@";

@Component({
  selector: 'app-search-workspace',
  standalone: true,
  imports: [SearchWorkspaceModule],
  templateUrl: './search-workspace.component.html',
  styleUrl: './search-workspace.component.scss'
})
export class SearchWorkspaceComponent implements OnInit, OnDestroy {
  searchWorkspaceForm = new FormControl<string>('');
  searchWorkspaceFormSub!: Subscription;
  prefix: SearchTag | null = null;
  channelsSub!: Subscription;
  channels: Channel[] = [];
  membersSub!: Subscription;
  members: User[] = [];
  channelsService = inject(ChannelsService);
  usersService = inject(UsersService);

  ngOnInit(): void {
    this.searchWorkspaceFormSub?.unsubscribe();
    this.searchWorkspaceForm.valueChanges.subscribe(value => this.handleSearch(value || ''));
    this.searchWorkspaceForm.setValue("");
  }

  handleSearch(value: string) {
    this.setPrefix(value);
    if(this.prefix == '#' || this.prefix == null)
      this.searchChannels(value);
    if(this.prefix == '@' || this.prefix == null)
      this.searchUsers(value);
  }

  searchUsers(value: string) {
    this.membersSub?.unsubscribe();
    this.membersSub = this.usersService
      .getUsersByDisplayName$(value)
      .subscribe(results => this.members = results);
  }

  searchChannels(value: string) {
    this.channelsSub?.unsubscribe();
    this.channelsSub = this.channelsService
      .getChannelsByNameQuery$(value)
      .subscribe(results => this.channels = results);
  }

  setPrefix(value: string) {
    if (value?.startsWith("#")) {
      this.prefix = "#";
      this.searchWorkspaceForm.setValue(this.searchWorkspaceForm.getRawValue()?.substring(1) || '');
    }
    else if (value?.startsWith("@")) {
      this.prefix = "@";
      this.searchWorkspaceForm.setValue(this.searchWorkspaceForm.getRawValue()?.substring(1) || '');
    }
  }

  onBackspace(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value === "") {
      this.prefix = null;
    }
  }

  displayFn(): string {
    return '';
  }

  ngOnDestroy(): void {
    this.searchWorkspaceFormSub?.unsubscribe();
    this.channelsSub?.unsubscribe();
    this.membersSub?.unsubscribe();
  }

}
