import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
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

  drawerWidth = 300;
  isResizing = false;
  startX!: number;
  startWidth!: number;
  readonly minDrawerWidth = 300;
  maxDrawerWidth = window.innerWidth * 0.9; // 90vw

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

  onResizeStart(event: MouseEvent): void {
    this.isResizing = true;
    this.startX = event.clientX;
    this.startWidth = this.drawerWidth;
    event.preventDefault();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isResizing) {
      const offset = event.clientX - this.startX;
      this.drawerWidth = Math.max(this.minDrawerWidth, Math.min(this.startWidth - offset, this.maxDrawerWidth));
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (this.isResizing) {
      this.isResizing = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    this.maxDrawerWidth = window.innerWidth * 0.9; // Update max width on window resize
  }
}
