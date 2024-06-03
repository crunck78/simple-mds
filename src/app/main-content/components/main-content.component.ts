import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthProcessService } from 'ngx-auth-firebaseui';
import { MainContentModule } from '../main-content.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  standalone: true,
  imports: [MainContentModule]
})
export class MainContentComponent implements OnInit, OnDestroy {
  public auth = inject(AuthProcessService);
  private breakpointObserver = inject(BreakpointObserver);
  private breakpointSub!: Subscription;
  sidesMode: "side" | "over" = "side";

  ngOnInit(): void {
    this.breakpointSub?.unsubscribe();
    this.breakpointSub = this.breakpointObserver
      .observe([Breakpoints.Large])
      .subscribe(result => {
        this.sidesMode = result.matches ? "side" : "over";
      });
  }

  ngOnDestroy(): void {
    this.breakpointSub?.unsubscribe();
  }
}
