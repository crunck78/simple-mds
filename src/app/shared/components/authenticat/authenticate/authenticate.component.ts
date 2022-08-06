import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handleAuthentication(authenticatedUser : any){
    console.log(authenticatedUser);
  }

  handleAuthenticationError(errorMessage : any){
    console.log(errorMessage);
  }

  handleTabChange(event : any){
    // Reset form
    console.log(event);
  }

}
