import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectMessageTitleComponent } from './direct-message-title.component';

describe('DirectMessageTitleComponent', () => {
  let component: DirectMessageTitleComponent;
  let fixture: ComponentFixture<DirectMessageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectMessageTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectMessageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
