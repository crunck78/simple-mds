import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelTitleComponent } from './channel-title.component';

describe('ChannelTitleComponent', () => {
  let component: ChannelTitleComponent;
  let fixture: ComponentFixture<ChannelTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
