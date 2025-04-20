import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorContractDialogComponent } from './vendor-contract-dialog.component';

describe('VendorContractDialogComponent', () => {
  let component: VendorContractDialogComponent;
  let fixture: ComponentFixture<VendorContractDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorContractDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorContractDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
