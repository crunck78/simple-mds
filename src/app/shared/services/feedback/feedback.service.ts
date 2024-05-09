import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private snackbar = inject(MatSnackBar);

  showFeedback(message: string){
    this.snackbar.open(message, 'Close');
  }
}
