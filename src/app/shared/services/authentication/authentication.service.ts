import { Injectable, inject } from '@angular/core';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private auth = inject(AuthProcessService);
  public user!: firebase.User | null;
  constructor() {
    this.auth.user$.subscribe((user) => this.user = user);
  }

  get user$(): Observable<firebase.User | null> {
    return this.auth.user$;
  }

  get userLoggedIn(): boolean{
    return this.user != null;
  }
}
