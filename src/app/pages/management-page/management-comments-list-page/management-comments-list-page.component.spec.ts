import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCommentsListPageComponent } from './management-comments-list-page.component';

describe('ManagementCommentsPageComponent', () => {
  let component: ManagementCommentsListPageComponent;
  let fixture: ComponentFixture<ManagementCommentsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementCommentsListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementCommentsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
