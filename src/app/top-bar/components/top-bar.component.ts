import { Component, inject } from '@angular/core';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { TopBarModule } from '../top-bar.module';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  standalone: true,
  imports: [TopBarModule]
})
export class TopBarComponent {
  auth = inject(AuthProcessService);

  signIn(){
    // TODO NAVIGATE TO AUTH
  }

  signOut(){
    this.auth.afa.signOut();
  }
}
