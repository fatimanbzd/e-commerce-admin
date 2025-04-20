import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMessageDialogComponent } from './vendor-message-dialog.component';

describe('VendorMessageDialogComponent', () => {
  let component: VendorMessageDialogComponent;
  let fixture: ComponentFixture<VendorMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorMessageDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
