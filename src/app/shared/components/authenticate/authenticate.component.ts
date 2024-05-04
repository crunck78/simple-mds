import { Component, OnInit, inject } from '@angular/core';
import { AuthProcessService, AuthProvider, NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import firebase from 'firebase/compat/app';
import { uniqueNamesGenerator, Config, adjectives, animals, colors, countries, languages, names, starWars, NumberDictionary } from 'unique-names-generator';
import { UsersService } from '../../services/users/users.service';
import { User, UserFactory } from '../../models/user.class';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxAuthFirebaseUIModule]
})
export class AuthenticateComponent implements OnInit {

  readonly providers = [AuthProvider.ANONYMOUS, AuthProvider.EmailAndPassword];
  readonly customConfig: Config = {
    dictionaries: [adjectives, animals, colors, countries, languages, names, starWars],
    separator: ' ',
    style: 'capital',
    length: 3,
  };
  loggedInUser!: firebase.User | null;

  private usersService = inject(UsersService);
  private auth = inject(AuthProcessService);

  ngOnInit(): void {
    this.auth.afa.onAuthStateChanged(
      (user) => this.loggedInUser = user,
      (err) => console.error(err))
  }

  async handleAuthentication(authenticatedUser: firebase.auth.UserCredential) {
    try {
      const isNewGuest = this.isNewGuest(authenticatedUser);
      if (isNewGuest) await this.initNewGuest(authenticatedUser);
      else await this.updateUser(authenticatedUser);
    } catch (error) { this.handleAuthenticationError(error); }
  }


  isNewGuest(authenticatedUser: firebase.auth.UserCredential) {
    return authenticatedUser.additionalUserInfo?.isNewUser &&
      authenticatedUser.user?.isAnonymous
  }

  async initNewGuest(authenticatedUser: firebase.auth.UserCredential) {
    if (!authenticatedUser.user) return;

    const randomName: string = uniqueNamesGenerator(this.customConfig);
    await authenticatedUser.user.updateProfile({ displayName: randomName });

    const newUserFactory = new UserFactory(authenticatedUser.user.toJSON() as User);
    newUserFactory.displayName = randomName;
    await this.usersService.updateUser(authenticatedUser.user.uid, newUserFactory.toJson());
  }

  async updateUser(authenticatedUser: firebase.auth.UserCredential) {
    const newUser = authenticatedUser.user?.toJSON() as User;
    const newUserFactory = new UserFactory(newUser);
    await this.usersService.updateUser((authenticatedUser.user as firebase.User).uid, newUserFactory.toJson());
  }

  handleAuthenticationError(errorMessage: any) {
    console.error(errorMessage);
  }

  handleTabChange(event: any) {
    console.log(event);
  }

}
