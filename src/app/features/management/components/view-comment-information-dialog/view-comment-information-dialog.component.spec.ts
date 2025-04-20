import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommentInformationDialogComponent } from './view-comment-information-dialog.component';

describe('ViewCommentInformationDialogComponent', () => {
  let component: ViewCommentInformationDialogComponent;
  let fixture: ComponentFixture<ViewCommentInformationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCommentInformationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCommentInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
