import { Component, OnInit } from '@angular/core';
import { AuthProcessService } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(
    public auth : AuthProcessService
  ) { }

  ngOnInit(): void {
  }

  signIn(){
    //TODO NAVIGATE TO AUTH
  }

  signOut(){
    this.auth.afa.signOut();
  }

}
