import { Component, inject } from '@angular/core';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { MainContentModule } from '../main-content.module';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  standalone: true,
  imports: [MainContentModule]
})
export class MainContentComponent {
  public auth = inject(AuthProcessService);
}
