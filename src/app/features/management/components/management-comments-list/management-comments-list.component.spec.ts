import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCommentsListComponent } from './management-comments-list.component';

describe('ManagementCommentsComponent', () => {
  let component: ManagementCommentsListComponent;
  let fixture: ComponentFixture<ManagementCommentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementCommentsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementCommentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
