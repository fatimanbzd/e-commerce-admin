import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDetailRejectDialogComponent } from './vendor-detail-reject-dialog.component';

describe('VendorDetailRejectDialogComponent', () => {
  let component: VendorDetailRejectDialogComponent;
  let fixture: ComponentFixture<VendorDetailRejectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorDetailRejectDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorDetailRejectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
