import { Component, OnInit, inject } from '@angular/core';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { AuthenticateComponent } from './shared/components/authenticate/authenticate.component';
import { DialogService } from './shared/services/dialog/dialog.service';
import { AppModule } from './app.module';
import { NavigationService } from './shared/services/navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [AppModule]
})
export class AppComponent implements OnInit {
  title = 'simple-mds';
  private auth = inject(AuthProcessService);
  private dialogService = inject(DialogService);
  private navigationService = inject(NavigationService);

  ngOnInit(): void {
    this.auth.afa.onAuthStateChanged(authUser => {
      if (!authUser)
        this.navigationService.navigateToAuthentication();
    });
  }

  openAuthenticationDialog() {
    const dialogRef = this.dialogService.openDialog(AuthenticateComponent);
    dialogRef.afterClosed().subscribe(closeResult => console.log(closeResult));
  }
}
