import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { AuthenticateComponent } from './shared/components/authenticat/authenticate/authenticate.component';
import { DialogService } from './shared/services/dialog/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-mds';

  constructor(
    private auth : AuthProcessService,
    private dialogService : DialogService,
    private router: Router,
    private route: ActivatedRoute
  ){
    // this.auth.afa.signOut();
    this.auth.afa
    .onAuthStateChanged( authUser => {
        if(!authUser)
          this.navigateToAuthentication();
        // else
        //   this.navigateToWorkspace();
    });
  }

  openAuthenticationDialog(){
    this.dialogService.openDialog(AuthenticateComponent)
    .subscribe(closeResult => console.log(closeResult));
  }

  navigateToAuthentication(){
    this.router.navigate([{outlets : {mainSide : ['auth']}}], {relativeTo : this.route.parent});
  }

  navigateToWorkspace(){
    this.router.navigateByUrl('/workspace');
  }

  myArray = [0, 1, 2, 3];

}
