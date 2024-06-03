import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWorkspaceComponent } from './search-workspace.component';

describe('SearchWorkspaceComponent', () => {
  let component: SearchWorkspaceComponent;
  let fixture: ComponentFixture<SearchWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchWorkspaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
