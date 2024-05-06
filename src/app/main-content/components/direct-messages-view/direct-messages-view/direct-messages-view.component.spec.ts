import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectMessagesViewComponent } from './direct-messages-view.component';

describe('DirectMessagesViewComponent', () => {
  let component: DirectMessagesViewComponent;
  let fixture: ComponentFixture<DirectMessagesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectMessagesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectMessagesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
