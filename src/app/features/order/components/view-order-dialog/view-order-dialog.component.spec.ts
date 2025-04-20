import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderDialogComponent } from './view-order-dialog.component';

describe('ViewOrderDialogComponent', () => {
  let component: ViewOrderDialogComponent;
  let fixture: ComponentFixture<ViewOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOrderDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {});
});
