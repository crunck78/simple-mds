import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog : MatDialog) { }

  openDialog(component : ComponentType<unknown>){
    const dialogRef = this.dialog.open(component, {
      width : '500px',
      minWidth : '300px',
      maxWidth : '500px'
    });
    return dialogRef.afterClosed();
  }

  // closeDialog(component : ComponentType<unknown>){

  // }
}
