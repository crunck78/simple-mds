import { Component, OnInit } from '@angular/core';
import { AuthProcessService } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  constructor(
    public auth : AuthProcessService
  ) {}

  ngOnInit(): void {
  }

}
