import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorContactInfoComponent } from './vendor-contact-info.component';

describe('VendorContactInfoComponent', () => {
  let component: VendorContactInfoComponent;
  let fixture: ComponentFixture<VendorContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorContactInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
