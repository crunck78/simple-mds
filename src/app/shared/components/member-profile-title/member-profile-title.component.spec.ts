import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfileTitleComponent } from './member-profile-title.component';

describe('MemberProfileTitleComponent', () => {
  let component: MemberProfileTitleComponent;
  let fixture: ComponentFixture<MemberProfileTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberProfileTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberProfileTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
