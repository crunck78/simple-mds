import { Injectable, inject } from '@angular/core';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private auth = inject(AuthProcessService);

  get user$(): Observable<firebase.User | null> {
    return this.auth.user$;
  }
}
