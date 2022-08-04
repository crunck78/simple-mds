import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDirectMessageComponent } from './add-direct-message.component';

describe('AddDirectMessageComponent', () => {
  let component: AddDirectMessageComponent;
  let fixture: ComponentFixture<AddDirectMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDirectMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDirectMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
